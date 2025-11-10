import { loadHighscores } from "../utils/highscore";
import { COLORS } from "../config";

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super("LeaderboardScene");
  }

  init(data) {
    this.highlight = data?.highlightEntry || null;
    this.highscores = data?.highscores || [];
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

    const lineHeight = (height - 140) / 10;
    (async () => {
      if (this.highscores.length === 0) {
        this.highscores = await loadHighscores();
      }
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
              fontSize: `${lineHeight - 11}px`,
              color,
            }
          )
          .setOrigin(0.5);
      });
    })();

    this.add.text(width - 200, height - 50, `Press ENTER to play again`, {
      fontFamily: "Impact, sans-serif",
      fontSize: "18px",
      color: COLORS.WHITE,
    });
    // .setOrigin(0.5);

    this.input.keyboard.once("keydown-ENTER", () => {
      this.scene.start("StartScene");
    });
  }
}
