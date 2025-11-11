import Entity from "./Entity.js";

export default class Dollar extends Entity {
  constructor(scene, dollarKey, minSpeed, maxSpeed, speedMultiplier = 1) {
    const x = Phaser.Math.Between(0, scene.scale.width);
    const y = -50;

    super(scene, x, y, dollarKey, minSpeed, maxSpeed, speedMultiplier);

    this.setScale(0.8);
    this.type = "dollar";
  }
}
