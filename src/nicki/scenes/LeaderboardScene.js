import * as Phaser from "phaser";
import { loadHighscores } from "../utils/highscore";
import { COLORS } from "../config";

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super("LeaderboardScene");
  }

  init(data) {
    this.highlight = data?.highlightEntry || null;
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor(COLORS.BLACK);

    const title = this.add.text(width / 2, 60, "Top Barbz <3", {
      fontFamily: "Impact, sans-serif",
      fontSize: "48px",
      color: COLORS.PINK,
    });
    title.setOrigin(0.5);

    const startY = 130;
    const lineHeight = 36;
    const doAsync = async () => {
      this.highscores = await loadHighscores();
      this.highscores.forEach((entry, index) => {
        const isHighlighted =
          this.highlight &&
          entry.name === this.highlight.name &&
          entry.score === this.highlight.score;

        const color = isHighlighted ? COLORS.PINK : COLORS.WHITE;

        this.add
          .text(
            width / 2,
            startY + index * lineHeight,
            `${index + 1}. ${entry.name} - ${entry.score}`,
            {
              fontFamily: "Impact, sans-serif",
              fontSize: "25px",
              color,
            }
          )
          .setOrigin(0.5);
      });

      this.input.keyboard.once("keydown-ENTER", () => {
        this.scene.start("StartScene");
      });
    };
    doAsync();
  }
}
