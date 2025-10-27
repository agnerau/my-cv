import Entity from "./Entity.js";

export default class Heel extends Entity {
  constructor(scene, textureKey = "heel") {
    const x = Phaser.Math.Between(0, scene.scale.width - 64);
    super(scene, x, -64, textureKey);
    this.speed = Phaser.Math.Between(5, 10);
  }
}
