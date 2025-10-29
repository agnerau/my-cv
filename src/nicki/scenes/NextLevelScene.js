import { levelManager, scoreManager } from "../config";

export default class NextLevelScene extends Phaser.Scene {
  constructor() {
    super("NextLevelScene");
  }

  preload() {
    this.load.image("next", "/nicki_assets/img/next.png");
    this.load.audio("superbass", "/nicki_assets/sound/superbass.wav");
    this.load.audio("kyuh", "/nicki_assets/sound/KYuH.wav");
  }

  create() {
    scoreManager.saveScore();
    levelManager.levelUp();

    const { width, height } = this.scale;
    const nextImg = this.add.image(width / 2, height / 2, "next");
    nextImg.setDisplaySize(width, height);
    // this.sound.play("kyuh");

    this.time.delayedCall(2000, () => {
      const currentMusic = this.sound.get("superbass");
      if (currentMusic) currentMusic.pause();
      this.scene.start("GameScene");
    });
  }
}
