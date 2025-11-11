import Phaser from "phaser";

export default class Entity extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, minSpeed, maxSpeed, speedMultiplier = 1) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.speed = Phaser.Math.Between(minSpeed, maxSpeed) * speedMultiplier;

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}
