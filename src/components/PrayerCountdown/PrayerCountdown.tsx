import { JSX, useEffect, useState, useRef } from "react";

interface PrayerTime {
  date: string;
  imsak: string;
  aksam: string;
}

// HIER DEIN ARRAY EINFÜGEN ↓
const prayerTimes: PrayerTime[] = [
  { date: "01 Mart 2025 Cumartesi", imsak: "05:19", aksam: "18:11" },
  { date: "02 Mart 2025 Pazar", imsak: "05:17", aksam: "18:13" },
  { date: "03 Mart 2025 Pazartesi", imsak: "05:15", aksam: "18:15" },
  { date: "04 Mart 2025 Salı", imsak: "05:12", aksam: "18:17" },
  { date: "05 Mart 2025 Çarşamba", imsak: "05:10", aksam: "18:19" },
  { date: "06 Mart 2025 Perşembe", imsak: "05:08", aksam: "18:21" },
  { date: "07 Mart 2025 Cuma", imsak: "05:05", aksam: "18:23" },
  { date: "08 Mart 2025 Cumartesi", imsak: "05:03", aksam: "18:24" },
  { date: "09 Mart 2025 Pazar", imsak: "05:00", aksam: "18:26" },
  { date: "10 Mart 2025 Pazartesi", imsak: "04:58", aksam: "18:28" },
  { date: "11 Mart 2025 Salı", imsak: "04:55", aksam: "18:30" },
  { date: "12 Mart 2025 Çarşamba", imsak: "04:53", aksam: "18:32" },
  { date: "13 Mart 2025 Perşembe", imsak: "04:50", aksam: "18:34" },
  { date: "14 Mart 2025 Cuma", imsak: "04:48", aksam: "18:36" },
  { date: "15 Mart 2025 Cumartesi", imsak: "04:45", aksam: "18:37" },
  { date: "16 Mart 2025 Pazar", imsak: "04:42", aksam: "18:39" },
  { date: "17 Mart 2025 Pazartesi", imsak: "04:40", aksam: "18:41" },
  { date: "18 Mart 2025 Salı", imsak: "04:37", aksam: "18:43" },
  { date: "19 Mart 2025 Çarşamba", imsak: "04:34", aksam: "18:45" },
  { date: "20 Mart 2025 Perşembe", imsak: "04:32", aksam: "18:47" },
  { date: "21 Mart 2025 Cuma", imsak: "04:29", aksam: "18:48" },
  { date: "22 Mart 2025 Cumartesi", imsak: "04:26", aksam: "18:50" },
  { date: "23 Mart 2025 Pazar", imsak: "04:23", aksam: "18:52" },
  { date: "24 Mart 2025 Pazartesi", imsak: "04:20", aksam: "18:54" },
  { date: "25 Mart 2025 Salı", imsak: "04:18", aksam: "18:56" },
  { date: "26 Mart 2025 Çarşamba", imsak: "04:15", aksam: "18:57" }, // Kadir Gecesi
  { date: "27 Mart 2025 Perşembe", imsak: "04:12", aksam: "18:59" },
  { date: "28 Mart 2025 Cuma", imsak: "04:09", aksam: "19:01" },
  { date: "29 Mart 2025 Cumartesi", imsak: "04:06", aksam: "19:03" },
  { date: "30 Mart 2025 Cumartesi", imsak: "04:06", aksam: "19:03" }, // Ramazan
  { date: "31 Mart 2025 Pazar", imsak: "04:06", aksam: "19:03" }, // Ramazan
  { date: "01 Nisan 2025 Pazartesi", imsak: "04:06", aksam: "19:03" }, // Ramazan
];

const formatTime = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  ).getTime();
};

const getTimeDifference = (targetTime: number): string => {
  const now = new Date().getTime();
  let diff = (targetTime - now) / 1000;

  if (diff < 0) return "İmsak vaxtı (sübh azanı) 🌙 🤲 !";

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  return `${hours} saat ${minutes} dəqiqə qalıb`;
};

export default function PrayerCountdown() {
  const [countdown, setCountdown] = useState("");
  const [message, setMessage] = useState<JSX.Element | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isNightMode, setIsNightMode] = useState(() =>
    JSON.parse((localStorage.getItem("nightMode") as string) || "false")
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem("nightMode", JSON.stringify(isNightMode));
    document.body.classList.toggle("night-mode", isNightMode);
  }, [isNightMode]);

  const todayDateString = new Date().toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const todayPrayer = prayerTimes.find((p) => p.date === todayDateString);
  const isKadirGecesi = todayDateString === "26 Mart 2025 Çarşamba";

  const isBayram = () => {
    const today = new Date();
    return (
      today.getFullYear() === 2025 &&
      ((today.getMonth() === 2 && today.getDate() >= 30) ||
        (today.getMonth() === 3 && today.getDate() <= 1))
    );
  };

  useEffect(() => {
    const updateCountdown = () => {
      const tomorrowDateString = new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        weekday: "long",
      });

      const tomorrowPrayer = prayerTimes.find(
        (p) => p.date === tomorrowDateString
      );

      if (!todayPrayer) {
        setCountdown("Tarix məlumatı tapılmadı");
        return;
      }

      const now = new Date();
      const imsakTime = formatTime(todayPrayer.imsak);
      const aksamTime = formatTime(todayPrayer.aksam);

      const isImsakActive =
        now.getTime() >= imsakTime && now.getTime() < imsakTime + 3600000;
      const isAksamActive =
        now.getTime() >= aksamTime && now.getTime() < aksamTime + 24000000;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (isImsakActive || isAksamActive) {
        timeoutRef.current = setTimeout(() => setMessage(null), 600000);
      }

      if (isImsakActive) {
        setMessage(
          <div className="message-content">
            <h2>İmsak vaxtı (sübh azanı) 🌙 🤲</h2>
            <p>
              <strong>Oruc üçün niyyət duası:</strong>
            </p>
            <p>
              <strong>
                "Nəvəytu ən əsûmə savmə şəhri raməzâne minəl fəcri iləl məğribi,
                xalisen lillâhi təalâ."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Ramazan ayının orucunu sübh azanından gün batana
              qədər Allah rizası üçün tutmağa niyyət etdim."
            </p>
            <p>
              Bundan başqa, sübh vaxtı edilən dualar daha çox Allahdan
              bağışlanma, bərəkət və ruzi istəməklə bağlı olur. İşdə bəzi
              tövsiyə olunan dualar:
            </p>
            <p>
              <strong>1. Peyğəmbərimizin (s.ə.s) sübh duası:</strong>
            </p>
            <p>
              <strong>
                "Allahummə barik lənə fî ma razəqtənə və qınə azabənnar."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Allahım! Bizə ruzi olaraq verdiklərini bərəkətli
              et və bizi cəhənnəm əzabından qoru."
            </p>
            <p>
              <strong>2. Bağışlanma və af üçün dua:</strong>
            </p>
            <p>
              <strong>
                "Allahummə innî əs'əlukəl-afvə vəl-afiyətə fid-dünya vəl-axirə."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Allahım! Səndən dünya və axirətdə bağışlanma və
              sağlamlıq diləyirəm."
            </p>
            <p>
              <strong>3. Quranda keçən gözəl dualardan biri:</strong>
            </p>
            <p>
              <strong>
                "Rabbi innî limə ənzəltə iləyyə min xayrin fəqir."
              </strong>
              (Qəsəs surəsi, 28:24)
            </p>
            <p>
              <em>Mənası:</em> "Rəbbim! Mənə göndərəcəyin hər bir xeyrə
              möhtacam."
            </p>
            <p>
              Bu duaları sübh vaxtı oxuyaraq Allahdan bərəkət, bağışlanma və
              mərhəmət diləyə bilərsiniz. Eyni zamanda, istiğfar etmək və
              <strong>“Lə iləhə illəllah”</strong> zikrini çox demək də çox
              savablıdır. 🌙 🤲
            </p>
            <div className="animation-container">
              <div className="moon-star"></div>
            </div>
          </div>
        );
      } else if (isAksamActive) {
        setMessage(
          <div className="message-content">
            {tomorrowPrayer && (
              <div className="tomorrow-times">
                <h3>Sabah üçün vaxtlar:</h3>
                <p>Sübh (İmsak): {tomorrowPrayer.imsak}</p>
                <p>İftar (axşam azanı): {tomorrowPrayer.aksam}</p>
              </div>
            )}
            <div className="prayer-animation">
              <div className="iftar-moon"></div>
            </div>
            <h2>İftar (axşam azanı) 🌙 🤲</h2>
            <p>
              <strong>
                1. İftar duası (Peyğəmbərimizin (s.ə.s) etdiyi dua)
              </strong>
            </p>
            <p>
              <strong>
                "Allahummə ləkə sumtu və bikə əməntu və aləyqə təvəkkəltu və alə
                rızqikə əftartu."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Allahım! Sənin üçün oruc tutdum, Sənə iman
              etdim, Sənə təvəkkül etdim və Sənin verdiyin ruzi ilə iftar
              etdim."
            </p>

            <p>
              <strong>2. Digər məşhur iftar duası</strong>
            </p>
            <p>
              <strong>
                "Zəhəbəz-zamə'u vəb-təllətil-urûq və səbətəl-əcru inşəAllah."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Susuzluq getdi, damarlar islqandı və inşallah
              savab sabit oldu."
            </p>

            <p>
              <strong>3. Şükür və bərəkət üçün dua</strong>
            </p>
            <p>
              <strong>
                "Allahummə bərik lənə fîhi və ə'timnə xayran minh."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Allahım! Bizi bu nemətlə bərəkətləndir və bizə
              daha xeyirlisini nəsib et."
            </p>

            <p>
              <strong>4. Günahların bağışlanması üçün dua</strong>
            </p>
            <p>
              <strong>
                "Allahummə ğəfirli zunubi və vəssi’ li fi dari və barik li fi
                rizqi."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Allahım! Günahlarımı bağışla, evimə bolluq ver
              və ruzimi bərəkətli et."
            </p>

            <p>
              <strong>5. Quranda keçən gözəl dua (Bəqərə surəsi, 2:286)</strong>
            </p>
            <p>
              <strong>
                "Rəbbənə la tuhammilnə ma la taqətə lənə bih. Və'fu anna vəğfir
                lənə vərhəmna."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Rəbbimiz! Bizə gücümüz çatmayan yükü yükləmə.
              Bizi bağışla, bizə rəhm et."
            </p>

            <p>
              İftar vaxtı bu duaları oxuyaraq Allahdan bərəkət, bağışlanma və
              mərhəmət diləyə bilərsiniz. Eyni zamanda,
              <strong>“Lə iləhə illəllah”</strong> zikrini çox etmək və Allaha
              həmd etmək də çox savablıdır. 🌙 🤲
            </p>
          </div>
        );
      } else {
        let targetTime = imsakTime;
        let targetName = "İmsak vaxtına (sübh azanı)";

        if (now.getTime() > aksamTime) {
          targetTime = tomorrowPrayer ? formatTime(tomorrowPrayer.imsak) : 0;
          targetName = "Yarınki İmsak vaxtına";
        } else if (now.getTime() > imsakTime) {
          targetTime = aksamTime;
          targetName = "İftar vaxtına (axşam azanı)";
        }

        setCountdown(`${targetName}: ${getTimeDifference(targetTime)}`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [todayPrayer]);

  return (
    <div className="app-container">
      {/* Hamburger Menu */}
      <div className="menu-container">
        <button className="hamburger" onClick={() => setIsMenuOpen(true)}>
          ☰
        </button>
        {isMenuOpen && (
          <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}>
            <div className="menu-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                ×
              </button>
              <button
                className="menu-item"
                onClick={() => {
                  setIsCalendarVisible(true);
                  setIsMenuOpen(false);
                }}
              >
                Ramadan Kalender 2025
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Night Mode Toggle */}
      <div className="theme-toggle">
        <a
          className={`toggle-btn ${isNightMode ? "night" : "day"}`}
          onClick={() => setIsNightMode(!isNightMode)}
        >
          {isNightMode ? "🌙" : "☀️"}
        </a>
      </div>

      {/* Calendar Modal */}
      {isCalendarVisible && (
        <div className="calendar-modal">
          <div className="calendar-header">
            <h2>Ramazan Kalender 2025</h2>
            <button
              className="close-calendar"
              onClick={() => setIsCalendarVisible(false)}
            >
              ×
            </button>
          </div>
          <div className="calendar-grid">
            {prayerTimes.map((time) => (
              <div key={time.date} className="calendar-item">
                <div className="date">{time.date}</div>
                <div className="times">
                  <div>İmsak: {time.imsak}</div>
                  <div>İftar: {time.aksam}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      {isBayram() ? (
        <div className="bayram-message">
          <h1>
            <span className="moon-icon">🌙</span>
            <br />
            Ramazan bayraminiz mübarək!
            <br />
            <span style={{ fontSize: "1.5rem" }}>Allah qəbul etsin! 💐</span>
          </h1>
        </div>
      ) : (
        <div className="main-content">
          <h1 className="animated-text">Allah orucunuzu qəbul eləsin!</h1>

          <div className="prayer-info">
            <p>Bugünkü Tarix: {todayDateString}</p>
            {todayPrayer && (
              <>
                <div className="prayer-time">
                  <span>Sübh (İmsak): </span>
                  <strong>{todayPrayer.imsak}</strong>
                </div>
                <div className="prayer-time">
                  <span>İftar (axşam azanı): </span>
                  <strong>{todayPrayer.aksam}</strong>
                </div>
              </>
            )}
          </div>

          {isKadirGecesi && (
            <div className="special-notice">
              <h3>🌟 Bu gün Qədir gecəsidir! 🌟</h3>
              <p>Bu mübarək gecədə dualarınız qəbul olsun!</p>
            </div>
          )}

          {message ? (
            <div className="message-box">{message}</div>
          ) : (
            <p className="countdown">{countdown}</p>
          )}
        </div>
      )}
    </div>
  );
}
