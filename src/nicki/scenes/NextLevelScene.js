import { levelManager, scoreManager } from "../config";

export default class NextLevelScene extends Phaser.Scene {
  constructor() {
    super("NextLevelScene");
  }

  preload() {}

  create() {
    scoreManager.saveScore();
    levelManager.levelUp();

    const { width, height } = this.scale;
    const nextImg = this.add.image(width / 2, height / 2, "next");
    nextImg.setDisplaySize(width, height);

    this.time.delayedCall(2000, () => {
      const currentMusic = this.sound.get("music");
      if (currentMusic) currentMusic.pause();
      this.scene.start("GameScene");
    });
  }
}
