import React, { useRef } from 'react';

export default function QuranAyah({ ayah }) {
  const audioRef = useRef(null);

  if (!ayah) return <div>آیه‌ای برای نمایش وجود ندارد.</div>;

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow text-center rtl font-vazir">
      <h2 className="text-2xl mb-4 font-bold">{ayah.text}</h2>
      <p className="mb-4 text-gray-700">{ayah.translation}</p>
      <button
        onClick={playAudio}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        پخش صوت آیه
      </button>
      <audio ref={audioRef} src={ayah.audio} />
    </div>
  );
}
