/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazirmatn", "sans-serif"],
        quran: ["Amiri Quran", "serif"],
      },
      colors: {
        primary: '#198754',
        quranGold: '#c5a253',
        quranNight: '#0f172a',
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out",
        fadeUp: "fadeUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}




// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         vazir: ["Vazirmatn", "sans-serif"],
//         amiri: ["Amiri", "serif"],
//         quran: ["'Amiri Quran'", "serif"]
//       },
//       colors: {
//         green: {
//           100: "#e6f4ec",
//           200: "#c7e8d8",
//           300: "#98d5b7",
//           600: "#17954c",
//           700: "#0f6d39",
//         },
//       },
//       animation: {
//         pulse: 'pulse 2.5s ease-in-out infinite',
//       }
//     },
//   },
//   plugins: [],
// }



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         vazir: ["Vazirmatn", "sans-serif"]
//       }
//     },
//   },
//   plugins: [],
// }
