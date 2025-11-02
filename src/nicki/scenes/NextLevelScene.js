import { levelManager, scoreManager } from "../config";

export default class NextLevelScene extends Phaser.Scene {
  constructor() {
    super("NextLevelScene");
  }

  preload() {}

  create() {
    scoreManager.saveScore();
    levelManager.levelUp();
    if (levelManager.level > 4) {
      const spawnManagers = this.registry.get("spawnManagers");

      Object.values(spawnManagers)?.forEach((spawnManager) => {
        if (spawnManager.type === "dollar" || spawnManager.type === "cardi")
          spawnManager.maxActive += 1;
      });
    }

    const { width, height } = this.scale;
    const nextImg = this.add.image(width / 2, height / 2, "next");
    nextImg.setDisplaySize(width, height);

    this.time.delayedCall(2000, () => {
      this.scene.start("GameScene");
    });
  }
}
