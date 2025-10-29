export default class Entity {
  constructor(scene, x, y, texture) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Phaser = require("phaser");

    const sprite = new Phaser.Physics.Arcade.Sprite(scene, x, y, texture);

    Object.assign(this, sprite);

    this.scene = scene;
    this.speed = 1;

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  update(multiplier = 1.15) {
    this.y += this.speed * multiplier;
  }
}
