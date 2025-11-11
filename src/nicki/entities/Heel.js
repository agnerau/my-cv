import Entity from "./Entity.js";

export default class Heel extends Entity {
  constructor(scene, heelKey, minSpeed, maxSpeed, speedMultiplier = 1) {
    const x = Phaser.Math.Between(0, scene.scale.width);
    const y = -50;

    super(scene, x, y, heelKey, minSpeed, maxSpeed, speedMultiplier);

    this.setScale(0.7);
    this.type = "heel";
  }
}
