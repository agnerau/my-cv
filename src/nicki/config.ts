import LevelManager from "./managers/LevelManager.js";
import ScoreManager from "./managers/ScoreManager.js";
import HealthManager from "./managers/HealthManager.js";
import SpawnManager from "./managers/SpawnManager.js";
import Pause from "./managers/PauseManager.js";
import Dollar from "./entities/Dollar.js";
import Cardi from "./entities/Cardi.js";
import Anaconda from "./entities/Anaconda.js";
import Heel from "./entities/Heel.js";

export const WINDOW_WIDTH = 1280;
export const WINDOW_HEIGHT = 720;

export const COLORS = {
  BLACK: "#000000",
  WHITE: "#ffffff",
  PINK: "#ff69b4",
};

export const levelManager = new LevelManager();
export const scoreManager = new ScoreManager();
export const healthManager = new HealthManager();
export const pause = new Pause();

export const ASSETS = {
  dollars: ["money_1", "money_2", "money_3", "money_4"],
  cardis: ["cardib_1", "cardib_2", "cardib_3", "cardib_4"],
  anaconda: "anaconda",
  heel: "heel",
  health: "health",
};

export function createSpawnManagers(scene: Phaser.Scene) {
  const dollarManager = new SpawnManager(
    "dollar",
    scene,
    (speedMultiplier: number) =>
      new Dollar(
        scene,
        Phaser.Math.RND.pick(ASSETS.dollars),
        150,
        250,
        speedMultiplier
      ),
    1000,
    { jiter: 200, maxActive: 5 }
  );

  const cardiManager = new SpawnManager(
    "cardi",
    scene,
    (speedMultiplier: number) =>
      new Cardi(
        scene,
        Phaser.Math.RND.pick(ASSETS.cardis),
        120,
        200,
        speedMultiplier
      ),
    2000,
    { jitter: 200, scaleWithLevel: true, minDelay: 500, maxActive: 5 }
  );

  const anacondaManager = new SpawnManager(
    "anaconda",
    scene,
    (speedMultiplier: number) =>
      new Anaconda(scene, ASSETS.anaconda, 180, 350, speedMultiplier),
    5000,
    { jitter: 400, scaleWithLevel: false, minDelay: 4000, maxActive: 1 }
  );

  const heelManager = new SpawnManager(
    "heel",
    scene,
    (speedMultiplier: number) =>
      new Heel(scene, ASSETS.heel, 250, 400, speedMultiplier),
    9000,
    { jitter: 800, scaleWithLevel: false, minDelay: 9000, maxActive: 1 }
  );

  return { dollarManager, cardiManager, anacondaManager, heelManager };
}
