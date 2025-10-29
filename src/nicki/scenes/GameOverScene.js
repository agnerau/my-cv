import { loadHighscores } from "../utils/highscore";
import { scoreManager, levelManager } from "../config";
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  preload() {}

  create() {
    const { width, height } = this.scale;

    this.add
      .image(width / 2, height / 2, "gameover")
      .setDisplaySize(width, height);
    this.sound.stopAll();
    this.sound.play("yeyks");

    scoreManager.saveScore();
    levelManager.reset();
    let highscores = [];
    let isHighscore = false;
    (async () => {
      highscores = await loadHighscores();
      isHighscore =
        highscores.length < 10 ||
        scoreManager.highScore > highscores[highscores.length - 1]?.score;
    })();

    this.time.delayedCall(3000, () => {
      this.scene.start("EnterNameScene", { highscores, isHighscore });
    });
  }
}
