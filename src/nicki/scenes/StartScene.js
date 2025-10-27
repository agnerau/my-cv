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
      .setDisplaySize(width * 0.75, height * 0.75);

    this.rulesImage = this.add
      .image(width / 2, height / 2, "rules")
      .setDisplaySize(width * 0.75, height * 0.75)
      .setVisible(false);

    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Escape") {
        this.game.destroy(true);
      } else if (!this.showRules) {
        this.showRules = true;
        this.startImage.setVisible(false);
        this.rulesImage.setVisible(true);
      } else {
        this.scene.start("GameScene");
      }
    });

    this.input.on("pointerdown", () => {
      if (!this.showRules) {
        this.showRules = true;
        this.startImage.setVisible(false);
        this.rulesImage.setVisible(true);
      } else {
        this.scene.start("GameScene");
      }
    });
  }
}
