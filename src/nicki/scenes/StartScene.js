import { showLoadingBar } from "../utils/ui";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
    this.showRules = false;
  }

  preload() {
    showLoadingBar(this);
    this.load.image("start", "/nicki_assets/img/start.png");
    this.load.image("rules", "/nicki_assets/img/rules.png");
    this.load.image("controls", "/nicki_assets/img/controls.png");

    this.load.image("background", "/nicki_assets/img/background.png");
    this.load.image("nicki", "/nicki_assets/img/nicki.png");
    this.load.image("nicki_shield", "/nicki_assets/img/nicki_highlighted.png");

    this.load.image("money_1", "/nicki_assets/img/money_1.png");
    this.load.image("money_2", "/nicki_assets/img/money_2.png");
    this.load.image("money_3", "/nicki_assets/img/money_3.png");
    this.load.image("money_4", "/nicki_assets/img/money_4.png");
    this.load.image("cardib_1", "/nicki_assets/img/cardib_1.png");
    this.load.image("cardib_2", "/nicki_assets/img/cardib_2.png");
    this.load.image("cardib_3", "/nicki_assets/img/cardib_3.png");
    this.load.image("cardib_4", "/nicki_assets/img/cardib_4.png");
    this.load.image("anaconda", "/nicki_assets/img/anaconda.png");
    this.load.image("heel", "/nicki_assets/img/heel.png");
    this.load.image("health", "/nicki_assets/img/health.png");

    // this.load.audio("music", "/nicki_assets/sound/superbass.mp3");
    this.load.audio("music", "/nicki_assets/sound/beat.mp3");
    this.load.audio("hit", "/nicki_assets/sound/hehehe.mp3");
    this.load.audio("collect1", "/nicki_assets/sound/hyuh.mp3");
    this.load.audio("collect2", "/nicki_assets/sound/kyeh.mp3");
    this.load.audio("collect3", "/nicki_assets/sound/KYuH.mp3");
    this.load.audio("collect4", "/nicki_assets/sound/mhein.mp3");
    this.load.audio("collect5", "/nicki_assets/sound/mmm.mp3");
    this.load.audio("collect6", "/nicki_assets/sound/kyehh.mp3");
    this.load.audio("anaconda", "/nicki_assets/sound/anaconda.mp3");

    this.load.image("pause_btn", "/nicki_assets/img/pause.png");
    this.load.image("play_btn", "/nicki_assets/img/play.png");
    this.load.image("sound_on", "/nicki_assets/img/sound_on.png");
    this.load.image("sound_off", "/nicki_assets/img/sound_off.png");
  }

  create() {
    this.showRules = false;
    const { width, height } = this.scale;

    this.startImage = this.add
      .image(width / 2, height / 2, "start")
      .setDisplaySize(width, height);

    this.rulesImage = this.add
      .image(width / 2, height / 2, "rules")
      .setDisplaySize(width, height)
      .setVisible(false);

    this.controlsImage = this.add
      .image(width / 2, height / 2, "controls")
      .setDisplaySize(width, height)
      .setVisible(false);

    this.input.keyboard.once("keydown-R", () => {
      if (!this.showRules) this.showRulesScreen();
    });

    this.events.on("shutdown", () => {
      this.input.keyboard.removeAllListeners();
      this.input.removeAllListeners();
    });

    this.registry.set("nickiSpeed", 5);
  }

  showRulesScreen() {
    this.showRules = true;
    this.startImage.setVisible(false);
    this.rulesImage.setVisible(true);
    this.time.delayedCall(50, () => {
      this.input.keyboard.once("keydown-R", () => this.showControls());
    });
  }

  showControls() {
    this.rulesImage.setVisible(false);
    this.controlsImage.setVisible(true);
    this.time.delayedCall(50, () => {
      this.input.keyboard.once("keydown-R", () =>
        this.scene.start("GameScene")
      );
    });
  }
}
