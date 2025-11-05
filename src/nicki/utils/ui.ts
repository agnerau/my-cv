import Phaser from "phaser";
import { formatTime } from "./time";

export function drawGameHUD(
  scene: Phaser.Scene,
  score: number,
  level: number,
  topScore: number,
  health: number,
  remainingSeconds: number
) {
  const width = scene.scale.width;
  const height = scene.scale.height;
  const graphics = scene.add.graphics();
  graphics.clear();

  const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: "20px",
    color: "#ffffff",
  };

  scene.add.text(20, 20, `Score: ${score}`, textStyle);
  scene.add.text(200, 20, `Level: ${level}`, textStyle);
  scene.add.text(380, 20, `Top: ${topScore}`, textStyle);

  scene.add.text(width - 100, 20, formatTime(remainingSeconds), {
    fontSize: "24px",
    color: "#ff69b4",
  });

  for (let i = 0; i < health; i++) {
    scene.add.image(width - 200 + i * 40, 25, "health").setScale(0.4);
  }
}

export function drawBackground(scene: Phaser.Scene, key: string) {
  const bg = scene.add.image(0, 0, key);
  bg.setOrigin(0);
  bg.setDisplaySize(scene.scale.width, scene.scale.height);
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
