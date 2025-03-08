import { JSX, useEffect, useState } from "react";

interface PrayerTime {
  date: string;
  imsak: string;
  aksam: string;
}

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
];

const formatTime = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return new Date().setHours(hours, minutes, 0, 0); // Setzt die Zeit mit der aktuellen Stunde
};

const getTimeDifference = (targetTime: number): string => {
  const now = new Date().getTime();
  let diff = (targetTime - now) / 1000; // Differenz in Sekunden

  if (diff < 0) return "İmsak vaxtı (sübh azanı) 🌙 🤲 !";

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  return `${hours} saat ${minutes} dəqiqə qalıb`;
};

export default function PrayerCountdown() {
  const [countdown, setCountdown] = useState<string>("");
  const [message, setMessage] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const today = new Date().toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        weekday: "long",
      });

      const todayPrayer = prayerTimes.find((p) => p.date === today);
      if (!todayPrayer)
        return setCountdown(
          "Ramazan › Tarix (2026) Bazar ertəsi, 16 fevral 2026 axşam – Çərşənbə, 18 mart 2026"
        );

      const now = new Date();
      const imsakTime = formatTime(todayPrayer.imsak);
      const aksamTime = formatTime(todayPrayer.aksam);

      const isImsakActive =
        now.getTime() >= imsakTime &&
        now.getTime() < imsakTime + 60 * 60 * 1000;
      const isAksamActive =
        now.getTime() >= aksamTime &&
        now.getTime() < aksamTime + 400 * 60 * 1000;

      if (isImsakActive) {
        setMessage(
          <div>
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
          </div>
        );
        setCountdown("");
      } else if (isAksamActive) {
        setMessage(
          <div>
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
        setCountdown("");
      } else {
        setMessage(null);
        setCountdown(
          now.getTime() < imsakTime
            ? `İmsak vaxtına (sübh azanı): ${getTimeDifference(imsakTime)} `
            : `İftar vaxtına (axşam azanı): ${getTimeDifference(aksamTime)}`
        );
      }

      if (today === "26 Mart 2025 Çarşamba") {
        setMessage(
          <div>
            <p>
              <strong>
                🌙 Qədir Gecəniz mübarək olsun! Allah dualarınızı qəbul etsin!
                🤲✨
              </strong>
            </p>
            <p>
              <strong>Qədir Gecəsində oxuna biləcək dualar</strong>
            </p>

            <p>
              <strong>
                1. Peyğəmbərimizin (s.ə.s) tövsiyə etdiyi bağışlanma duası:
              </strong>
            </p>
            <p>
              <strong>
                "Allahummə innəkə afuvvun, tuhibbul-afvə, fə'fu anni."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Allahım! Sən bağışlayansan, bağışlamağı
              sevirsən, məni də bağışla!"
            </p>

            <p>
              <strong>2. Günahların bağışlanması üçün dua:</strong>
            </p>
            <p>
              <strong>
                "Rəbbənə ğəfir lənə zunubənə və kəffir annə sayyiatinə və
                təvəffənə məəl-əbrar."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Rəbbimiz! Günahlarımızı bağışla, pis
              əməllərimizi sil və bizi salehlərlə birlikdə vəfat etdir."
            </p>

            <p>
              <strong>3. Hidayət və bərəkət üçün dua:</strong>
            </p>
            <p>
              <strong>"Allahummə hdini və səddidni."</strong>
            </p>
            <p>
              <em>Mənası:</em> "Allahım! Mənə hidayət ver və işlərimi düzgün
              yönləndir."
            </p>

            <p>
              <strong>
                4. Dünya və axirət xeyri üçün dua (Bəqərə surəsi, 2:201):
              </strong>
            </p>
            <p>
              <strong>
                "Rabbənə ātinā fid-dunyā hasənətən və fil-āxirəti hasənətən və
                qinā azəbən-nār."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Rəbbimiz! Bizə dünyada da, axirətdə də yaxşılıq
              ver və bizi cəhənnəm əzabından qoru."
            </p>

            <p>
              <strong>
                5. Quranda keçən möhtəşəm bir dua (Ali-İmran, 3:8):
              </strong>
            </p>
            <p>
              <strong>
                "Rəbbənə la tuziğ qulubənə bə’də iz hədəytənə və həb lənə min
                lədunkə rahmətən, innəkə əntəl-vəhhab."
              </strong>
            </p>
            <p>
              <em>Mənası:</em> "Ey Rəbbimiz! Bizə hidayət verdikdən sonra
              qəlbimizi haqdan döndərmə və bizə Öz tərəfindən mərhəmət bəxş et!
              Həqiqətən, Sən çox bağışlayansan."
            </p>

            <p>
              <strong>Qədir Gecəsində nə etmək lazımdır?</strong>
            </p>
            <p>
              ✅ Bağışlanma diləmək (<em>istiğfar etmək</em>)
            </p>
            <p>✅ Quran oxumaq və anlamını düşünmək</p>
            <p>✅ Namaz qılmaq və zikr etmək</p>
            <p>✅ Dualar edərək Allahdan dünya və axirət xeyrini istəmək</p>
          </div>
        );
      }
    };

    updateCountdown(); // Initialer Aufruf
    const interval = setInterval(updateCountdown, 1000); // Update jede Sekunde

    return () => clearInterval(interval); // Interval wird beim Verlassen der Komponente gestoppt
  }, []); // Leeres Array sorgt dafür, dass useEffect nur einmal beim ersten Laden ausgeführt wird

  const todayDateString = new Date().toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
  const todayPrayer = prayerTimes.find((p) => p.date === todayDateString);

  return (
    <div>
      <h1>✨ 🌙 Allah orucunuzu qəbul eləsin! 💙 🤲🏼 ✨</h1>
      <p>
        📅 <strong>{todayDateString}</strong>
      </p>
      {todayPrayer && (
        <>
          <p>
            🌙 İmsak: <strong>{todayPrayer.imsak}</strong>
          </p>
          <p>
            🌆 İftar (axşam azanı) : <strong>{todayPrayer.aksam}</strong>
          </p>
        </>
      )}
      <p className="countdown">{countdown}</p>
      {message && <div>{message}</div>}
    </div>
  );
}
