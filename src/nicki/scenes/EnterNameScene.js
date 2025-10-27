import * as Phaser from "phaser";
import { scoreManager, levelManager } from "../config";
import { loadHighscores, saveHighscores } from "../utils/highscore";

export default class EnterNameScene extends Phaser.Scene {
  constructor() {
    super("EnterNameScene");
  }

  preload() {}

  create() {
    scoreManager.saveScore();
    levelManager.reset();

    const doAsync = async () => {
      const highscores = await loadHighscores();

      const isHighscore =
        highscores.length < 10 ||
        scoreManager.highScore > highscores[highscores.length - 1]?.score;

      this.startNameEntry(highscores, isHighscore);
    };
    doAsync();
  }

  startNameEntry(highscores, isHighscore) {
    this.namePromptShown = true;

    this.cameras.main.fadeOut(500, 0, 0, 0);

    this.time.delayedCall(600, () => {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      this.showNamePrompt(highscores, isHighscore);
    });
  }

  showNamePrompt(highscores, isHighscore) {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor("#000000");

    if (isHighscore) {
      this.input.keyboard.enabled = true;
      this.enteredName = "";

      this.nameText = this.add
        .text(width / 2, height / 2, "Enter your name: ", {
          fontFamily: "Impact",
          fontSize: 32,
          color: "#fff",
        })
        .setOrigin(0.5);

      this.input.keyboard.on("keydown", (event) => {
        if (event.key === "Backspace") {
          this.enteredName = this.enteredName.slice(0, -1);
        } else if (event.key === "Enter") {
          const name = this.enteredName || "Barb";
          const newEntry = { name, score: scoreManager.highScore };

          highscores.push(newEntry);
          highscores.sort((a, b) => b.score - a.score);
          const top10 = highscores.slice(0, 10);
          const doAsync = async () => {
            await saveHighscores(top10);
          };
          doAsync();

          scoreManager.resetAll();
          this.scene.start("LeaderboardScene", {
            highscores: top10,
            highlightEntry: newEntry,
          });
        } else if (event.key.length === 1 && this.enteredName.length < 10) {
          this.enteredName += event.key;
        }

        this.nameText.setText(`Enter your name: ${this.enteredName}`);
      });
    } else {
      this.time.delayedCall(2000, () => {
        scoreManager.resetAll();
        this.scene.start("LeaderboardScene", { highscores });
      });
    }
  }
}
