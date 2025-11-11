import Entity from "./Entity.js";

export default class Cardi extends Entity {
  constructor(scene, cardiKey, minSpeed, maxSpeed, speedMultiplier = 1) {
    const x = Phaser.Math.Between(0, scene.scale.width);
    const y = -50;

    super(scene, x, y, cardiKey, minSpeed, maxSpeed, speedMultiplier);

    this.setScale(0.8);
    this.setDepth(5);
    this.type = "cardi";
  }
}
