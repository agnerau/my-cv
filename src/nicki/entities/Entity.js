export default class Entity extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.speed = 1;

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  update(multiplier = 1.15) {
    this.y += this.speed * multiplier;
  }
}
