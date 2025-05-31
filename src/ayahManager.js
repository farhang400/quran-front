import { quranData } from './quranData';

const GLOBAL_COUNTER_KEY = 'khaatm-global-counter';
const TOTAL_AYAHS = quranData.length;

export function getNextAvailableAyah() {
  let counter = parseInt(localStorage.getItem(GLOBAL_COUNTER_KEY) || '0', 10);
  const index = counter % TOTAL_AYAHS;
  counter += 1;
  localStorage.setItem(GLOBAL_COUNTER_KEY, counter.toString());
  return index;
}

export function getGlobalStats() {
  const counter = parseInt(localStorage.getItem(GLOBAL_COUNTER_KEY) || '0', 10);
  return {
    totalRead: counter,
    khatmsDone: Math.floor(counter / TOTAL_AYAHS),
  };
}
