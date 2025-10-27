import Phaser from "phaser";
import Nicki from "../entities/Nicki";
import Entity from "../entities/Entity";
import { scoreManager, levelManager, healthManager } from "../config";

export function handlePositiveEntity(
  scene: Phaser.Scene,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manager: any,
  activeEntities: Entity[],
  points: number,
  speedMultiplier: number,
  nicki: Nicki,
  sounds: string[]
) {
  if (manager.shouldSpawn(scene.time.now)) {
    activeEntities.push(manager.spawn(scene));
  }

  for (const entity of [...activeEntities]) {
    entity.update(speedMultiplier);
    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        nicki.getBounds(),
        entity.getBounds()
      )
    ) {
      Phaser.Utils.Array.Remove(activeEntities, entity);
      const soundKey = Phaser.Utils.Array.GetRandom(sounds);
      scene.sound.play(soundKey);
      scoreManager.addPoints(points * (levelManager.level + 1));
    }
  }
}

export function handleNegativeEntity(
  scene: Phaser.Scene,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manager: any,
  activeEntities: Entity[],
  points: number,
  health: number,
  speedMultiplier: number,
  nicki: Nicki,
  soundKey: string
) {
  if (
    manager.shouldSpawn(
      scene.time.now,
      levelManager.level,
      activeEntities.length
    )
  ) {
    activeEntities.push(manager.spawn(scene));
  }

  for (const entity of [...activeEntities]) {
    entity.update(speedMultiplier);
    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        nicki.getBounds(),
        entity.getBounds()
      )
    ) {
      Phaser.Utils.Array.Remove(activeEntities, entity);
      scene.sound.play(soundKey);
      scoreManager.minusPoints(points * (levelManager.level + 1));
      healthManager.minusHealth(health);
    }
  }
}

export function handleHeel(
  scene: Phaser.Scene,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heelManager: any,
  activeHeels: Entity[],
  seconds: number,
  speedMultiplier: number,
  nicki: Nicki,
  sounds: string[]
) {
  if (
    heelManager.shouldSpawn(
      scene.time.now,
      levelManager.level,
      activeHeels.length
    )
  ) {
    activeHeels.push(heelManager.spawn(scene));
  }

  for (const heel of [...activeHeels]) {
    heel.update(speedMultiplier);
    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        nicki.getBounds(),
        heel.getBounds()
      )
    ) {
      Phaser.Utils.Array.Remove(activeHeels, heel);
      nicki.activateShield(seconds);
      const soundKey = Phaser.Utils.Array.GetRandom(sounds);
      scene.sound.play(soundKey);
    }
  }
}
