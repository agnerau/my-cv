import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "highscores.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, "utf8")
        : "[]";
      res.status(200).json(JSON.parse(data));
    } catch (err) {
      res.status(500).json({ error: "Failed to read highscores" });
    }
  } else if (req.method === "POST") {
    try {
      const scores = req.body;
      fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));
      res.status(200).json({ message: "Highscores saved" });
    } catch (err) {
      res.status(500).json({ error: "Failed to save highscores" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
