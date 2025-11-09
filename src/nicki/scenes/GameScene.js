import { createSpawnManagers, WINDOW_WIDTH, WINDOW_HEIGHT } from "../config";
import { scoreManager, healthManager, levelManager, COLORS } from "../config";
import { showLoadingBar } from "../utils/ui";

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
      this.music = this.sound.add("music", { loop: true, volume: 0.2 });
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
        this.timerText.setText(this.formatTime(seconds));

        if (this.remainingTime <= 0) {
          this.clearEntities();
          this.scene.start("NextLevelScene");
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.activeEntities = {
      dollars: [],
      cardis: [],
      anacondas: [],
      heels: [],
    };

    this.nicki = this.physics.add.sprite(width / 2, height / 2, "nicki");
    this.nicki.setDisplaySize(width * 0.12, height * 0.24);
    this.nicki.setCollideWorldBounds(true);
    let nickiSpeed = this.registry.get("nickiSpeed");
    this.nicki.speed = nickiSpeed * 1.2;
    this.registry.set("nickiSpeed", this.nicki.speed);
    this.nicki.shieldActive = false;
    this.nicki.shieldEndTime = 0;
    // this.nicki = new Nicki(this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.entities = this.physics.add.group();

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
    this.drawHealth();
  }

  update(time, delta) {
    if (this.isPaused) return;

    const velocity = this.nicki.speed;
    if (this.cursors.left.isDown) this.nicki.x -= velocity;
    if (this.cursors.right.isDown) this.nicki.x += velocity;
    if (this.cursors.up.isDown) this.nicki.y -= velocity;
    if (this.cursors.down.isDown) this.nicki.y += velocity;

    if (this.nicki.shieldActive && time >= this.nicki.shieldEndTime) {
      this.nicki.shieldActive = false;
      this.nicki.setTexture("nicki");
      this.nicki.setDisplaySize(
        this.scale.width * 0.12,
        this.scale.height * 0.24
      );
      this.nicki.body.setSize(this.scale.width, this.scale.height);
    }

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

    const speedMultiplier = 1 + levelManager.level * 0.2;

    if (
      dollarManager.shouldSpawn(
        0,
        levelManager.level,
        this.activeEntities.dollars.length
      )
    ) {
      const dollarKey = Phaser.Math.RND.pick([
        "money_1",
        "money_2",
        "money_3",
        "money_4",
      ]);
      const entity = this.physics.add.sprite(
        Phaser.Math.Between(0, WINDOW_WIDTH),
        -50,
        dollarKey
      );
      entity.setScale(0.8);
      entity.speed = Phaser.Math.Between(
        150 * speedMultiplier,
        250 * speedMultiplier
      );
      entity.type = "dollar";
      this.entities.add(entity);
      this.activeEntities.dollars.push(entity);
      dollarManager.spawn();
    }

    if (
      cardiManager.shouldSpawn(
        1,
        levelManager.level,
        this.activeEntities.cardis.length
      )
    ) {
      const cardiKey = Phaser.Math.RND.pick([
        "cardib_1",
        "cardib_2",
        "cardib_3",
        "cardib_4",
      ]);
      const entity = this.physics.add.sprite(
        Phaser.Math.Between(0, WINDOW_WIDTH),
        -50,
        cardiKey
      );
      entity.setScale(0.8);
      entity.speed = Phaser.Math.Between(
        120 * speedMultiplier,
        200 * speedMultiplier
      );
      entity.type = "cardi";
      this.entities.add(entity);
      this.activeEntities.cardis.push(entity);
      cardiManager.spawn();
    }

    if (
      anacondaManager.shouldSpawn(
        2,
        levelManager.level,
        this.activeEntities.anacondas.length
      )
    ) {
      const entity = this.physics.add.sprite(
        Phaser.Math.Between(0, WINDOW_WIDTH),
        -50,
        "anaconda"
      );
      entity.setScale(0.65);
      entity.speed = Phaser.Math.Between(
        180 * speedMultiplier,
        350 * speedMultiplier
      );
      entity.type = "anaconda";
      this.entities.add(entity);
      this.activeEntities.anacondas.push(entity);
      anacondaManager.spawn();
    }

    if (
      heelManager.shouldSpawn(
        3,
        levelManager.level,
        this.activeEntities.heels.length
      )
    ) {
      const entity = this.physics.add.sprite(
        Phaser.Math.Between(0, WINDOW_WIDTH),
        -50,
        "heel"
      );
      entity.setScale(0.7);
      entity.speed = Phaser.Math.Between(
        250 * speedMultiplier,
        400 * speedMultiplier
      );
      entity.type = "heel";
      this.entities.add(entity);
      this.activeEntities.heels.push(entity);
      heelManager.spawn();
    }

    this.entities.children.iterate((entity) => {
      if (!entity) return;

      entity.y += (entity.speed / 1000) * 16;

      if (entity.y > WINDOW_HEIGHT + 50) {
        entity.destroy();

        if (entity.type === "dollar") {
          const index = this.activeEntities.dollars.indexOf(entity);
          if (index > -1) this.activeEntities.dollars.splice(index, 1);
        } else if (entity.type === "cardi") {
          const index = this.activeEntities.cardis.indexOf(entity);
          if (index > -1) this.activeEntities.cardis.splice(index, 1);
        } else if (entity.type === "anaconda") {
          const index = this.activeEntities.anacondas.indexOf(entity);
          if (index > -1) this.activeEntities.anacondas.splice(index, 1);
        } else if (entity.type === "heel") {
          const index = this.activeEntities.heels.indexOf(entity);
          if (index > -1) this.activeEntities.heels.splice(index, 1);
        }
      }
    });
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
      entity.destroy();
      const index = this.activeEntities.dollars.indexOf(entity);
      if (index > -1) this.activeEntities.dollars.splice(index, 1);
    } else if (entity.type === "cardi") {
      if (!nicki.shieldActive) {
        hitSound.play();
        scoreManager.minusPoints(100 * (levelManager.level + 1));
        healthManager.minusHealth(1);
        this.drawHealth();
        entity.destroy();
        const index = this.activeEntities.cardis.indexOf(entity);
        if (index > -1) this.activeEntities.cardis.splice(index, 1);
      }
    } else if (entity.type === "anaconda") {
      scoreManager.addPoints(1000 * (levelManager.level + 1));
      anacondaSound.play();
      this.activeEntities.anacondas = this.activeEntities.anacondas.filter(
        (e) => e !== entity
      );
      entity.destroy();
      const index = this.activeEntities.anacondas.indexOf(entity);
      if (index > -1) this.activeEntities.anacondas.splice(index, 1);
    } else if (entity.type === "heel") {
      this.activateShield(7000);
      playRandomCollect();
      entity.destroy();
      const index = this.activeEntities.heels.indexOf(entity);
      if (index > -1) this.activeEntities.heels.splice(index, 1);
    }
  }

  activateShield(duration) {
    const { width, height } = this.scale;
    this.nicki.shieldActive = true;
    this.nicki.shieldEndTime = this.time.now + duration;
    this.nicki.setTexture("nicki_shield");
    this.nicki.setDisplaySize(width * 0.15, height * 0.3);
    this.nicki.body.setSize(width, height);
  }

  drawHealth() {
    this.healthIcons.forEach((icon) => icon.destroy());
    this.healthIcons = [];
    const height = this.scale.width < 760 ? this.scale.height - 50 : 40;
    const width = this.scale.width < 760 ? 50 : this.scale.width - 350;
    for (let i = 0; i < healthManager.health; i++) {
      const heart = this.add
        .image(width + i * 50, height, "health")
        .setDepth(10);
      heart.setDisplaySize(40, 35);
      this.healthIcons.push(heart);
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
