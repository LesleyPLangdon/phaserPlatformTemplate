export function createPlayer(scene, x = 100, y = 50) {
  const player = scene.physics.add.sprite(x, y, 'player');
  player.setSize(120, 150).setOffset(0, 100);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  return player;
}

export function updatePlayerMovement(scene, player) {
  // Create once and reuse
  if (!scene.cursors) scene.cursors = scene.input.keyboard.createCursorKeys();
  const cursors = scene.cursors;

  player.setVelocityX(0);

  if (cursors.left.isDown) player.setVelocityX(-180);
  else if (cursors.right.isDown) player.setVelocityX(180);

  if (cursors.up.isDown && player.body.touching.down) player.setVelocityY(-300);
}
