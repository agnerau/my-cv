import Phaser from "phaser";

export default class Nicki extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "nicki");

    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setDepth(1);
    this.setOriginalSize();

    this.speed = scene.registry.get("nickiSpeed") || 200;
    this.speed *= 1.2;
    this.shieldActive = false;
    this.shieldElapsed = 0;
    this.shieldDuration = 0;

    scene.registry.set("nickiSpeed", this.speed);
  }

  update(cursors) {
    if (!cursors) return;

    this.setVelocity(0);

    if (cursors.left.isDown) {
      this.setVelocityX(-this.speed);
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.speed);
    }

    if (cursors.up.isDown) {
      this.setVelocityY(-this.speed);
    } else if (cursors.down.isDown) {
      this.setVelocityY(this.speed);
    }
  }

  activateShield(duration = 7000) {
    this.shieldActive = true;
    this.shieldElapsed = 0;
    this.shieldDuration = duration;
    this.setTexture("nicki_shield");
    this.setShieldSize();
  }
  updateShield(delta) {
    if (!this.shieldActive) return;

    this.shieldElapsed += delta;
    if (this.shieldElapsed >= this.shieldDuration) {
      this.shieldActive = false;
      this.setTexture("nicki");
      this.setOriginalSize();
    }
  }

  setOriginalSize() {
    this.setDisplaySize(
      this.scene.scale.width * 0.12,
      this.scene.scale.height * 0.24
    );
    this.setBodySize();
  }

  setShieldSize() {
    this.setDisplaySize(
      this.scene.scale.width * 0.15,
      this.scene.scale.height * 0.3
    );
    this.setBodySize();
  }

  setBodySize() {
    const origWidth = this.texture.getSourceImage().width;
    const origHeight = this.texture.getSourceImage().height;

    this.body.setSize(origWidth * 0.75, origHeight);
  }
}
