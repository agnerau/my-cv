import { createSpawnManagers, WINDOW_HEIGHT } from "../config";
import { scoreManager, healthManager, levelManager, COLORS } from "../config";
import { showLoadingBar, formatTime, drawHealth } from "../utils/ui";
import Nicki from "../entities/Nicki";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.speedMultiplier = 1;
    this.musicStarted = false;
    this.activeEntities = {
      dollars: [],
      cardis: [],
      anacondas: [],
      heels: [],
    };
  }

  preload() {
    showLoadingBar(this);
    this.load.image("next", "/nicki_assets/img/next.png");
    this.load.image("gameover", "/nicki_assets/img/over.png");
    this.load.audio("yeyks", "/nicki_assets/sound/yeyks.mp3");
  }

  create() {
    const { width, height } = this.scale;

    this.background = this.add.image(width / 2, height / 2, "background");
    this.background.setDisplaySize(width, height);

    this.spawnManagers = createSpawnManagers(this);
    this.registry.set("spawnManagers", this.spawnManagers);
    scoreManager.resetScore();

    if (!this.musicStarted) {
      this.music = this.sound.add("music", { loop: true, volume: 0.5 });
      this.music.play();
      this.musicStarted = true;
    }

    this.timeLimit = 15000;
    this.remainingTime = this.timeLimit;

    this.timerText = this.add
      .text(width - 140, 20, "00:15", {
        fontFamily: "Impact",
        fontSize: 28,
        color: COLORS.WHITE,
      })
      .setDepth(10);

    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.remainingTime -= 1000;
        const seconds = Math.ceil(this.remainingTime / 1000);
        this.timerText.setText(formatTime(seconds));

        if (this.remainingTime <= 0) {
          this.clearEntities();
          this.scene.start("NextLevelScene");
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.nicki = new Nicki(this, width / 2, height / 2);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.entities = this.physics.add.group();
    this.clearEntities();

    this.physics.add.overlap(
      this.nicki,
      this.entities,
      this.handleCollision,
      null,
      this
    );

    this.highscoreText = this.add
      .text(20, 20, "Score: 0", {
        fontFamily: "Impact",
        fontSize: 28,
        color: COLORS.WHITE,
      })
      .setDepth(10);

    this.levelText = this.add
      .text(280, 20, "Level: 1", {
        fontFamily: "Impact",
        fontSize: 28,
        color: COLORS.WHITE,
      })
      .setDepth(10);

    this.isPaused = false;

    this.pauseButton = this.add
      .image(this.scale.width - 150, this.scale.height - 50, "pause_btn")
      .setInteractive()
      .setScale(0.35)
      .setScrollFactor(0)
      .setDepth(10);

    this.pauseButton.on("pointerdown", () => {
      this.togglePause();
    });

    this.muteButton = this.add
      .image(
        this.scale.width - 70,
        this.scale.height - 50,
        this.sound.mute ? "sound_off" : "sound_on"
      )
      .setInteractive()
      .setScale(0.35)
      .setScrollFactor(0)
      .setDepth(10);

    this.muteButton.on("pointerdown", () => {
      this.toggleMute();
    });

    this.pauseButton.on("pointerover", () => this.pauseButton.setScale(0.4));
    this.pauseButton.on("pointerout", () => this.pauseButton.setScale(0.35));
    this.muteButton.on("pointerover", () => this.muteButton.setScale(0.4));
    this.muteButton.on("pointerout", () => this.muteButton.setScale(0.35));

    this.input.keyboard.on("keydown-M", () => this.toggleMute());
    this.input.keyboard.on("keydown-P", () => this.togglePause());

    this.healthIcons = [];
    this.healthIcons = drawHealth(this, this.healthIcons, healthManager);
  }

  update(time, delta) {
    if (this.isPaused) return;
    this.nicki.updateShield(delta);

    this.nicki.update(this.cursors);

    this.spawnEntities();

    this.highscoreText.setText(
      `Score: ${scoreManager.score + scoreManager.highScore}`
    );
    this.levelText.setText(`Level: ${levelManager.level + 1}`);

    if (healthManager.health <= 0) {
      this.clearEntities();
      this.scene.start("GameOverScene", { score: scoreManager.highScore });
    }
  }

  spawnEntities() {
    const { dollarManager, cardiManager, anacondaManager, heelManager } =
      this.spawnManagers;

    if (
      dollarManager.shouldSpawn(
        0,
        levelManager.level,
        this.activeEntities.dollars.length
      )
    ) {
      this.spawnEntity("dollar");
    }

    if (
      cardiManager.shouldSpawn(
        1,
        levelManager.level,
        this.activeEntities.cardis.length
      )
    ) {
      this.spawnEntity("cardi");
    }

    if (
      anacondaManager.shouldSpawn(
        2,
        levelManager.level,
        this.activeEntities.anacondas.length
      )
    ) {
      this.spawnEntity("anaconda");
    }

    if (
      heelManager.shouldSpawn(
        3,
        levelManager.level,
        this.activeEntities.heels.length
      )
    ) {
      this.spawnEntity("heel");
    }

    this.entities.children.iterate((entity) => {
      if (!entity) return;

      entity.y += (entity.speed / 1000) * 16;

      if (entity.y > WINDOW_HEIGHT + 50) {
        this.removeEntity(entity);
      }
    });
  }

  spawnEntity(type) {
    const { dollarManager, cardiManager, anacondaManager, heelManager } =
      this.spawnManagers;
    const speedMultiplier = 1 + levelManager.level * 0.2;
    let entity;
    switch (type) {
      case "dollar":
        entity = dollarManager.spawn(speedMultiplier);
        break;
      case "cardi":
        entity = cardiManager.spawn(speedMultiplier);
        break;
      case "anaconda":
        entity = anacondaManager.spawn(speedMultiplier);
        break;
      case "heel":
        entity = heelManager.spawn(speedMultiplier);
        break;
    }

    if (entity) {
      this.entities.add(entity);
      this.activeEntities[`${type}s`].push(entity);
    }
  }

  removeEntity(entity) {
    entity.destroy();

    const pluralType = `${entity.type}s`;

    const list = this.activeEntities[pluralType];
    if (!list) {
      console.warn(`Unknown entity type: ${type}`);
      return;
    }

    const index = list.indexOf(entity);
    if (index > -1) list.splice(index, 1);
  }

  clearEntities() {
    Object.values(this.activeEntities).forEach((entities) => {
      entities.forEach((entity) => entity.destroy());
    });
    Object.keys(this.activeEntities).forEach((key) => {
      this.activeEntities[key] = [];
    });

    this.entities.clear(true, true);
  }

  handleCollision(nicki, entity) {
    const hitSound = this.sound.add("hit", { volume: 0.5 });
    const anacondaSound = this.sound.add("anaconda");
    const collectSounds = [
      "collect1",
      "collect2",
      "collect3",
      "collect4",
      "collect5",
      "collect6",
    ];
    const playRandomCollect = () =>
      this.sound.play(Phaser.Math.RND.pick(collectSounds));

    if (entity.type === "dollar") {
      scoreManager.addPoints(100 * (levelManager.level + 1));
      playRandomCollect();
      this.removeEntity(entity);
    } else if (entity.type === "cardi") {
      if (!nicki.shieldActive) {
        hitSound.play();
        scoreManager.minusPoints(100 * (levelManager.level + 1));
        healthManager.minusHealth(1);
        this.healthIcons = drawHealth(this, this.healthIcons, healthManager);
        this.removeEntity(entity);
      }
    } else if (entity.type === "anaconda") {
      scoreManager.addPoints(1000 * (levelManager.level + 1));
      anacondaSound.play();
      this.activeEntities.anacondas = this.activeEntities.anacondas.filter(
        (e) => e !== entity
      );
      this.removeEntity(entity);
    } else if (entity.type === "heel") {
      this.nicki.activateShield(7000);
      playRandomCollect();
      this.removeEntity(entity);
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;

    if (this.isPaused) {
      this.music.pause();
    } else {
      this.music.resume();
    }

    this.physics.world.isPaused = this.isPaused;
    this.timerEvent.paused = this.isPaused;

    this.pauseButton.setTexture(this.isPaused ? "play_btn" : "pause_btn");
  }

  toggleMute() {
    this.sound.mute = !this.sound.mute;
    this.muteButton.setTexture(this.sound.mute ? "sound_on" : "sound_off");
  }
}
