import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("highscores")
      .select("*")
      .order("score", { ascending: false })
      .limit(10);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { name, score } =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!name || !score) {
      return res.status(400).json({ error: "Name or score missing" });
    }
    let processedName = name;
    processedName = processName(name);

    let processedScore = score;
    processedScore = processScore(score);

    const { data, error } = await supabase
      .from("highscores")
      .insert([{ name: processedName, score: processedScore }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

function processName(name: string) {
  let cleanName = String(name)
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .replace(/[^a-zA-Z0-9 _\-\u00C0-\u017F]/g, "");

  if (cleanName.length === 0) cleanName = "Barb";
  cleanName = cleanName.slice(0, 10);

  return cleanName;
}

function processScore(score: number) {
  const numericScore = Number(score);
  if (
    !Number.isInteger(numericScore) ||
    numericScore < 0 ||
    numericScore > 1_000_000_000
  )
    return 0;
  return numericScore;
}
