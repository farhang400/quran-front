import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// تبدیل اعداد انگلیسی به فارسی
const toPersianNumber = (num) =>
  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

function App() {
  const [ayah, setAyah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [khatmCount, setKhatmCount] = useState(1);
  const [canContinue, setCanContinue] = useState(false);
  const audioRef = useRef(null);

  // گرفتن آیه از API بر اساس شماره کل آیه در قرآن
  const getAyahByIndex = async (index) => {
    setLoading(true);
    try {
      const arRes = await fetch(
        `https://api.alquran.cloud/v1/ayah/${index}/ar.alafasy`
      );
      const faRes = await fetch(
        `https://api.alquran.cloud/v1/ayah/${index}/fa.gharaati`
      );

      const arData = await arRes.json();
      const faData = await faRes.json();

      const khatm = Math.floor((index - 1) / 6236) + 1;
      setKhatmCount(khatm);

      setAyah({
        number: index,
        text: arData.data.text,
        audio: arData.data.audio,
        surah: arData.data.surah.name,
        ayahNumber: arData.data.numberInSurah,
        translation: faData.data.text,
      });

      localStorage.setItem("currentAyahIndex", index);
      setCanContinue(false);
    } catch (err) {
      console.error("خطا در دریافت آیه", err);
      setAyah(null);
    } finally {
      setLoading(false);
    }
  };

  const reserveAyah = async (index) => {
  try {
    await fetch("https://quran-backend-ukef.onrender.com/api/reserveAyah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });
  } catch (err) {
    console.error("خطا در رزرو آیه:", err);
  }
};


  // بارگذاری اولیه
  useEffect(() => {
    const alreadyListened = localStorage.getItem("audioListened");
    const savedIndex = localStorage.getItem("currentAyahIndex");

    if (alreadyListened === "true" && savedIndex) {
      handleNext();
    } else if (savedIndex) {
      getAyahByIndex(Number(savedIndex));
    } else {
      fetchAyah();
    }
  }, []);

  // دریافت آیه بعدی از بک‌اند
  const fetchAyah = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://quran-backend-ukef.onrender.com/api/getAyah", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.done) {
        alert("ختم کامل شده!");
        setAyah(null);
        setLoading(false);
        return;
      }

      await getAyahByIndex(data.index);
      await reserveAyah(data.index);
      localStorage.setItem("audioListened", "false");
    } catch (err) {
      console.error("خطا در دریافت آیه", err);
      setAyah(null);
    } finally {
      setLoading(false);
    }
  };

  // وقتی صوت آیه به پایان رسید
  const handleAudioEnd = () => {
    localStorage.setItem("audioListened", "true");
    setCanContinue(true);
  };

  // ادامه ختم (دریافت آیه بعدی)
  const handleNext = async () => {
    const index = localStorage.getItem("currentAyahIndex");
    if (!index) return;

    try {
      await fetch("https://quran-backend-ukef.onrender.com/api/markListened", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: Number(index) }),
      });

      localStorage.removeItem("audioListened");
      localStorage.removeItem("currentAyahIndex");
      await fetchAyah();
    } catch (err) {
      console.error("خطا در ثبت شنیدن آیه", err);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-600 text-xl font-semibold font-vazir">
        در حال بارگذاری آیه...
      </div>
    );

  if (!ayah)
    return (
      <div className="text-center mt-20 text-red-600 text-lg font-vazir">
        خطا در دریافت آیه
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center px-4 py-8 font-vazir">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="quran-box w-full max-w-xl relative"
      >
        <h1 className="text-2xl font-bold text-primary drop-shadow-sm">
          ختم شماره {toPersianNumber(khatmCount)}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="quran-font"
        >
          {ayah.text}
        </motion.p>

        <p className="text-gray-700 text-md leading-relaxed font-vazir">
          {ayah.translation}
        </p>

        <p className="text-sm text-gray-600 font-vazir">
          {ayah.surah} - آیه {toPersianNumber(ayah.ayahNumber)}
        </p>

        <audio
          ref={audioRef}
          controls
          className="w-full rounded-lg shadow-md"
          onEnded={handleAudioEnd}
          preload="auto"
        >
          <source src={ayah.audio} type="audio/mp3" />
          مرورگر شما از پخش صوت پشتیبانی نمی‌کند.
        </audio>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: canContinue ? 1.05 : 1 }}
          onClick={handleNext}
          disabled={!canContinue}
          className={`quran-button mt-4 ${
            canContinue ? "cursor-pointer" : "cursor-not-allowed opacity-60"
          }`}
        >
          مشارکت مجدد
        </motion.button>
      </motion.div>

      <footer className="footer-text">
        مرکز راهبردی فضای مجازی نمایندگی ولی فقیه در سپاه قدس گیلان
      </footer>
    </div>
  );
}

export default App;








