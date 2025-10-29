export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  preload() {
    this.load.image("gameover", "/nicki_assets/img/over.png");
    this.load.audio("yeyks", "/nicki_assets/sound/yeyks.wav");
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .image(width / 2, height / 2, "gameover")
      .setDisplaySize(width, height);
    this.sound.stopAll();
    this.sound.play("yeyks");

    this.time.delayedCall(3000, () => {
      this.scene.start("EnterNameScene");
    });
  }
}
