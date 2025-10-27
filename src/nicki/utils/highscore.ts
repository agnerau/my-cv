export interface HighscoreEntry {
  name: string;
  score: number;
}

export async function saveHighscores(scores: HighscoreEntry[]) {
  await fetch("/api/highscores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(scores),
  });
}

export async function loadHighscores(): Promise<HighscoreEntry[]> {
  const res = await fetch("/api/highscores");
  return res.json();
}

export async function enterName(): Promise<string> {
  return new Promise((resolve) => {
    const name = prompt("Enter your name (max 10 chars):") || "Barb";
    resolve(name.substring(0, 10));
  });
}
