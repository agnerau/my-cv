import * as Phaser from "phaser";
import { levelManager, scoreManager, pause } from "../config";

export default class NextLevelScene extends Phaser.Scene {
  constructor() {
    super("NextLevelScene");
  }

  preload() {
    this.load.image("next", "/nicki_assets/img/next.png");
    this.load.audio("superbass", "/nicki_assets/sound/superbass.wav");
  }

  create() {
    scoreManager.saveScore();
    levelManager.levelUp();

    const { width, height } = this.scale;
    const nextImg = this.add.image(width / 2, height / 2, "next");
    nextImg.setDisplaySize(width, height);

    this.time.delayedCall(2000, () => {
      const currentMusic = this.sound.get("superbass");
      if (currentMusic) pause.pauseup(Math.floor(currentMusic.seek));
      this.scene.start("GameScene");
    });
  }
}
