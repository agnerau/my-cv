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

    const { data, error } = await supabase
      .from("highscores")
      .insert([{ name, score }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
