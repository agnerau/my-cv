export default class SpawnManager {
  constructor(scene, spawnFn, baseDelay, options = {}) {
    this.scene = scene;
    this.spawnFn = spawnFn;
    this.baseDelay = baseDelay;
    this.jitter = options.jitter ?? 200;
    this.scaleWithLevel = options.scaleWithLevel ?? false;
    this.minDelay = options.minDelay ?? 500;
    this.maxActive = options.maxActive ?? null;
    this.lastSpawnTime = this.scene.time.now;
  }

  getDelay(level) {
    let delay = this.baseDelay;
    if (this.scaleWithLevel) {
      delay = Math.max(this.minDelay, this.baseDelay - level * 100);
    }
    if (this.jitter) {
      delay += Phaser.Math.Between(-this.jitter, this.jitter);
    }
    return Math.max(this.minDelay, delay);
  }

  shouldSpawn(currentTime, level = 0, activeCount = 0) {
    if (this.maxActive && activeCount >= this.maxActive) return false;
    return currentTime - this.lastSpawnTime >= this.getDelay(level);
  }

  spawn() {
    this.lastSpawnTime = this.scene.time.now;
    return this.spawnFn();
  }
}
