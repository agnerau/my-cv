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
    const gameScene = this.scene.get("GameScene");
    gameScene.musicStarted = false;
    this.sound.play("yeyks");

    scoreManager.saveScore();
    levelManager.reset();

    this.time.delayedCall(3000, async () => {
      const highscores = await loadHighscores();
      const isHighscore =
        highscores.length < 10 ||
        scoreManager.highScore > highscores[highscores.length - 1]?.score;

      this.scene.start("EnterNameScene", { highscores, isHighscore });
    });
  }
}
