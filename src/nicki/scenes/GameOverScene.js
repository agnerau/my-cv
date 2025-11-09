import { loadHighscores } from "../utils/highscore";
import { scoreManager, levelManager, healthManager } from "../config";
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
    healthManager.reset();

    this.time.delayedCall(2000, async () => {
      const highscores = await loadHighscores();
      const isHighscore =
        highscores.length < 10 ||
        scoreManager.highScore > highscores[highscores.length - 1]?.score;
      if (isHighscore) {
        this.scene.start("EnterNameScene");
      } else {
        scoreManager.resetAll();
        this.scene.start("LeaderboardScene", { highscores: highscores });
      }
    });
  }
}
