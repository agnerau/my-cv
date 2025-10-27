import * as Phaser from "phaser";

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
      .setDisplaySize(width * 0.75, height * 0.75);

    const pressKeyText = this.add
      .text(width / 2, height - 50, "Press any key to continue", {
        fontFamily: "Impact",
        fontSize: 28,
        color: "#fff",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: pressKeyText,
      alpha: { from: 1, to: 0 },
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    this.sound.stopAll();
    this.sound.play("yeyks");

    this.input.keyboard.once("keydown", () => {
      this.scene.start("EnterNameScene");
    });

    this.time.delayedCall(3000, () => {
      this.scene.start("EnterNameScene");
    });
  }
}
