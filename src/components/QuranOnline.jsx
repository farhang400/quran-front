import React, { useEffect, useState } from "react";

export default function QuranOnline() {
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAyahs() {
      try {
        let allAyahs = [];

        for (let surah = 1; surah <= 114; surah++) {
          const res = await fetch(
            `https://api.quran.com/api/v4/verses/by_chapter/${surah}?language=fa&words=false&audio=7&translations=131`
          );
          const data = await res.json();
          allAyahs = allAyahs.concat(data.verses);
        }

        setAyahs(allAyahs);
      } catch (err) {
        console.error("خطا در دریافت آیات:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAyahs();
  }, []);

  if (loading)
    return <p className="text-center mt-10">در حال بارگذاری آیات...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      {ayahs.map((ayah) => (
        <div
          key={ayah.id}
          className="mb-6 bg-white p-4 rounded shadow text-right rtl font-quran"
        >
          <p className="text-2xl">{ayah.text_uthmani}</p>
          <p className="text-gray-700 mt-2">{ayah.translations[0].text}</p>
          <audio
            controls
            src={ayah.audio_primary.url}
            className="mt-2 w-full"
          ></audio>
          <p className="text-sm text-gray-500 mt-1">
            سوره {ayah.chapter_id} - آیه {ayah.verse_number}
          </p>
        </div>
      ))}
    </div>
  );
}
