export default class PauseManager {
  constructor(scene) {
    this.scene = scene;
    this.pausedAt = 0;
  }

  pause() {
    this.pausedAt = this.scene.time.now;
    this.scene.scene.pause();
  }

  resume() {
    const resumeTime = this.scene.time.now;
    const pausedFor = resumeTime - this.pausedAt;
    this.scene.scene.resume();
    return pausedFor / 1000;
  }
}
