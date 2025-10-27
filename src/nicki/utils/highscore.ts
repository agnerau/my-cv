export interface HighscoreEntry {
  name: string;
  score: number;
}

const STORAGE_KEY = "barbz_highscores";

export function loadHighscores(): HighscoreEntry[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveHighscores(scores: HighscoreEntry[]) {
  const sorted = [...scores].sort((a, b) => b.score - a.score).slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
}

export async function enterName(): Promise<string> {
  return new Promise((resolve) => {
    const name = prompt("Enter your name (max 10 chars):") || "Barb";
    resolve(name.substring(0, 10));
  });
}
