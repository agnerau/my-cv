import Phaser from "phaser";
import HealthManager from "../managers/HealthManager";

export function drawHealth(
  scene: Phaser.Scene,
  healthIcons: Phaser.GameObjects.Image[],
  healthManager: HealthManager
) {
  healthIcons.forEach((icon) => icon.destroy());
  healthIcons = [];
  const height = scene.scale.width < 760 ? scene.scale.height - 50 : 40;
  const width = scene.scale.width < 760 ? 50 : scene.scale.width - 350;
  for (let i = 0; i < healthManager.health; i++) {
    const heart = scene.add
      .image(width + i * 50, height, "health")
      .setDepth(10);
    heart.setDisplaySize(40, 35);
    healthIcons.push(heart);
  }
  return healthIcons;
}

export function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export function showLoadingBar(scene: Phaser.Scene) {
  const { width, height } = scene.scale;
  const loadingText = scene.add
    .text(width / 2, height / 2, "Loading...", {
      fontFamily: "Impact, sans-serif",
      fontSize: "32px",
      color: "#FF69B4",
    })
    .setOrigin(0.5);

  const progressBar = scene.add.rectangle(
    width / 2 - 150,
    height / 2 + 50,
    0,
    20,
    0xff69b4
  );
  const progressBox = scene.add
    .rectangle(width / 2, height / 2 + 50, 300, 20)
    .setStrokeStyle(2, 0xffffff);

  scene.load.on("progress", (value: number) => {
    progressBar.width = 300 * value;
  });

  scene.load.on("complete", () => {
    loadingText.destroy();
    progressBar.destroy();
    progressBox.destroy();
  });
}
