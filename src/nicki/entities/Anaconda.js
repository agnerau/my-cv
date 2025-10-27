import Entity from "./Entity.js";

export default class Anaconda extends Entity {
  constructor(scene, textureKey = "anaconda") {
    const x = Phaser.Math.Between(0, scene.scale.width - 64);
    super(scene, x, -64, textureKey);
    this.speed = Phaser.Math.Between(7, 12);
  }
}
