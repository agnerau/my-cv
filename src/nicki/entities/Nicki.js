import Entity from "./Entity.js";

export default class Nicki extends Entity {
  constructor(scene, textureKey = "nicki", shieldKey = "nickiShield") {
    const x = Phaser.Math.Between(0, scene.scale.width - 64);
    const y = scene.scale.height / 2;
    super(scene, x, y, textureKey);

    this.setCollideWorldBounds(true);

    this.shieldActive = false;
    this.shieldEndTime = 0;
    this.shieldSprite = scene.add.sprite(x, y, shieldKey);
    this.shieldSprite.setVisible(false);

    this.speed = 300;
    this.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update(time, delta, speedMultiplier = 1, remainingTime = 10000) {
    const velocity = this.speed * speedMultiplier;
    this.body.setVelocity(0);

    if (this.cursors.up.isDown) this.body.setVelocityY(-velocity);
    if (this.cursors.down.isDown) this.body.setVelocityY(velocity);
    if (this.cursors.left.isDown) this.body.setVelocityX(-velocity);
    if (this.cursors.right.isDown) this.body.setVelocityX(velocity);

    // Update shield
    this.shieldSprite.setPosition(this.x, this.y);
    if (this.shieldActive && this.scene.time.now > this.shieldEndTime) {
      this.shieldActive = false;
      this.shieldSprite.setVisible(false);
    }

    // Level complete condition
    if (remainingTime <= 0) {
      this.scene.scene.start("NextLevelScene");
    }
  }

  activateShield(durationSeconds) {
    this.shieldActive = true;
    this.shieldSprite.setVisible(true);
    this.shieldEndTime = this.scene.time.now + durationSeconds * 1000;
  }
}
