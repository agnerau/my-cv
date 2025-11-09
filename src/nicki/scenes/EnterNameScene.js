import { scoreManager } from "../config";
import { loadHighscores, saveHighscore } from "../utils/highscore";
import { COLORS } from "../config";

export default class EnterNameScene extends Phaser.Scene {
  constructor() {
    super("EnterNameScene");
  }

  preload() {}

  create() {
    this.startNameEntry();
  }

  startNameEntry() {
    this.namePromptShown = true;

    this.time.delayedCall(600, () => {
      this.showNamePrompt();
    });
  }

  showNamePrompt() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor(COLORS.BLACK);

    this.input.keyboard.enabled = true;
    this.enteredName = "";

    this.nameText = this.add
      .text(width / 2, height / 2, "Enter your name: ", {
        fontFamily: "Impact",
        fontSize: 32,
        color: COLORS.WHITE,
      })
      .setOrigin(0.5);

    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Backspace") {
        this.enteredName = this.enteredName.slice(0, -1);
      } else if (event.key === "Enter") {
        const name = this.enteredName || "Barb";
        const newEntry = { name, score: scoreManager.highScore };

        (async () => {
          try {
            await saveHighscore(newEntry);
            const newTop10 = await loadHighscores();

            scoreManager.resetAll();

            this.scene.start("LeaderboardScene", {
              highscores: newTop10,
              highlightEntry: newEntry,
            });
          } catch (err) {
            console.error("Failed to save/load highscores:", err);
          }
        })();
      } else if (event.key.length === 1 && this.enteredName.length < 10) {
        this.enteredName += event.key;
      }

      this.nameText.setText(`Enter your name: ${this.enteredName}`);
    });
  }
}
