import Entity from "./Entity.js";

export default class Anaconda extends Entity {
  constructor(scene, anacondaKey, minSpeed, maxSpeed, speedMultiplier = 1) {
    const x = Phaser.Math.Between(0, scene.scale.width);
    const y = -50;

    super(scene, x, y, anacondaKey, minSpeed, maxSpeed, speedMultiplier);

    this.setScale(0.65);
    this.type = "anaconda";
  }
}
