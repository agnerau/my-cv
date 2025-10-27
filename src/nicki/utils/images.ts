export function loadScaledImage(
  scene: Phaser.Scene,
  key: string,
  path: string,
  scaleX = 1,
  scaleY = 1
) {
  scene.load.image(key, path);
}
