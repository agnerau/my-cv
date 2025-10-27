import * as Phaser from "phaser";
import { createSpawnManagers, WINDOW_WIDTH, WINDOW_HEIGHT } from "../config";
import { scoreManager, healthManager, levelManager } from "../config";

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

    // Sounds
    this.load.audio("music", "/nicki_assets/sound/superbass.wav");
    this.load.audio("hit", "/nicki_assets/sound/hehehe.wav");
    this.load.audio("collect1", "/nicki_assets/sound/hyuh.wav");
    this.load.audio("collect2", "/nicki_assets/sound/kyeh.wav");
    this.load.audio("collect3", "/nicki_assets/sound/KYuH.wav");
    this.load.audio("collect4", "/nicki_assets/sound/mhein.wav");
    this.load.audio("collect5", "/nicki_assets/sound/mmm.wav");
    this.load.audio("collect6", "/nicki_assets/sound/kyehh.wav");
  }

  create() {
    const { width, height } = this.scale;

    this.background = this.add.image(width / 2, height / 2, "background");
    this.background.setDisplaySize(width, height);

    this.spawnManagers = createSpawnManagers(this);
    scoreManager.resetScore();
    healthManager.reset();

    if (!this.musicStarted) {
      this.music = this.sound.add("music", { loop: true, volume: 0.2 });
      this.music.play();
      this.musicStarted = true;
    }

    this.startTime = this.time.now;
    this.timeLimit = 15000;

    this.nicki = this.physics.add.sprite(width / 2, height / 2, "nicki");
    this.nicki.setDisplaySize(width * 0.1, height * 0.2);
    this.nicki.setCollideWorldBounds(true);
    this.nicki.speed = 300;
    this.nicki.shieldActive = false;
    this.nicki.shieldEndTime = 0;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.entities = this.physics.add.group();

    this.physics.add.overlap(
      this.nicki,
      this.entities,
      this.handleCollision,
      null,
      this
    );

    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontFamily: "Impact",
      fontSize: 28,
      color: "#fff",
    });
    this.levelText = this.add.text(250, 20, "Level: 1", {
      fontFamily: "Impact",
      fontSize: 28,
      color: "#fff",
    });
    this.timerText = this.add.text(WINDOW_WIDTH - 140, 20, "00:15", {
      fontFamily: "Impact",
      fontSize: 28,
      color: "#fff",
    });
    this.healthIcons = [];
    this.drawHealth();
  }

  update(time, delta) {
    const elapsed = time - this.startTime;
    const remaining = Math.max(this.timeLimit - elapsed, 0);
    const seconds = Math.ceil(remaining / 1000);
    this.timerText.setText(this.formatTime(seconds));

    if (remaining <= 0) {
      this.clearEntities();
      this.scene.start("NextLevelScene");
    }

    const velocity = this.nicki.speed * (delta / 1000);
    if (this.cursors.left.isDown) this.nicki.x -= velocity;
    if (this.cursors.right.isDown) this.nicki.x += velocity;
    if (this.cursors.up.isDown) this.nicki.y -= velocity;
    if (this.cursors.down.isDown) this.nicki.y += velocity;

    if (this.nicki.shieldActive && time >= this.nicki.shieldEndTime) {
      this.nicki.shieldActive = false;
      this.nicki.setTexture("nicki");
    }

    this.spawnEntities(time);

    this.scoreText.setText(`Score: ${scoreManager.score}`);
    this.levelText.setText(`Level: ${levelManager.level + 1}`);

    if (healthManager.health <= 0) {
      this.clearEntities();
      this.scene.start("GameOverScene", { score: scoreManager.highScore });
    }
  }

  spawnEntities(time) {
    const { dollarManager, cardiManager, anacondaManager, heelManager } =
      this.spawnManagers;

    if (
      dollarManager.shouldSpawn(
        time,
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
      entity.speed = Phaser.Math.Between(150, 250);
      entity.type = "dollar";
      this.entities.add(entity);
      this.activeEntities.dollars.push(entity);
    }

    if (
      cardiManager.shouldSpawn(
        time,
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
      entity.speed = Phaser.Math.Between(120, 200);
      entity.type = "cardi";
      this.entities.add(entity);
      this.activeEntities.cardis.push(entity);
    }

    if (
      levelManager.level > 1 &&
      anacondaManager.shouldSpawn(
        time,
        levelManager.level,
        this.activeEntities.anacondas.length
      )
    ) {
      const entity = this.physics.add.sprite(
        Phaser.Math.Between(0, WINDOW_WIDTH),
        -50,
        "anaconda"
      );
      entity.speed = Phaser.Math.Between(180, 250);
      entity.type = "anaconda";
      this.entities.add(entity);
      this.activeEntities.anacondas.push(entity);
    }

    if (
      levelManager.level > 2 &&
      heelManager.shouldSpawn(
        time,
        levelManager.level,
        this.activeEntities.heels.length
      )
    ) {
      const entity = this.physics.add.sprite(
        Phaser.Math.Between(0, WINDOW_WIDTH),
        -50,
        "heel"
      );
      entity.speed = Phaser.Math.Between(150, 200);
      entity.type = "heel";
      this.entities.add(entity);
      this.activeEntities.heels.push(entity);
    }

    // Move them
    this.entities.children.iterate((entity) => {
      if (!entity) return; // <-- skip undefined

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
      }
      entity.destroy();
      const index = this.activeEntities.cardis.indexOf(entity);
      if (index > -1) this.activeEntities.cardis.splice(index, 1);
    } else if (entity.type === "anaconda") {
      scoreManager.addPoints(1000);
      playRandomCollect();
      entity.destroy();
      const index = this.activeEntities.anacondas.indexOf(entity);
      if (index > -1) this.activeEntities.anacondas.splice(index, 1);
    } else if (entity.type === "heel") {
      this.activateShield(7000); // 7 seconds
      playRandomCollect();
      entity.destroy();
      const index = this.activeEntities.heels.indexOf(entity);
      if (index > -1) this.activeEntities.heels.splice(index, 1);
    }
  }

  activateShield(duration) {
    this.nicki.shieldActive = true;
    this.nicki.shieldEndTime = this.time.now + duration;
    this.nicki.setTexture("nicki_shield");
  }

  drawHealth() {
    this.healthIcons.forEach((icon) => icon.destroy());
    this.healthIcons = [];
    for (let i = 0; i < healthManager.health; i++) {
      const heart = this.add.image(WINDOW_WIDTH - 250 + i * 50, 40, "health");
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
}
