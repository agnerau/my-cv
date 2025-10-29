import * as Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
    this.showRules = false;
  }

  preload() {
    this.load.image("start", "/nicki_assets/img/start.png");
    this.load.image("rules", "/nicki_assets/img/rules.png");
  }

  create() {
    const { width, height } = this.scale;

    this.startImage = this.add
      .image(width / 2, height / 2, "start")
      .setDisplaySize(width, height);

    this.rulesImage = this.add
      .image(width / 2, height / 2, "rules")
      .setDisplaySize(width, height)
      .setVisible(false);

    this.input.keyboard.on("keydown-R", () => {
      if (!this.showRules) this.showRulesScreen();
    });
  }

  showRulesScreen() {
    this.showRules = true;
    this.startImage.setVisible(false);
    this.rulesImage.setVisible(true);

    this.time.delayedCall(50, () => {
      this.input.keyboard.once("keydown", () => this.scene.start("GameScene"));
      this.input.once("pointerdown", () => this.scene.start("GameScene"));
    });
  }
}
