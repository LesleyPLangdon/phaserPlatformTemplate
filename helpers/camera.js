export function setupCamera(scene, player, worldWidth, worldHeight) {
  scene.cameras.main.startFollow(player, true, 0.05, 0.05);
  scene.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
}
