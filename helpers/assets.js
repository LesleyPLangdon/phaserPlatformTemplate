export function loadSharedAssets(scene) {
  scene.load.image('background', '/assets/spaceBackground2.png');
  scene.load.image('ground', '/assets/grass.png');
  scene.load.image('player', '/assets/alienGreen_walk1.png');

  // planets (keep your existing keys)
  scene.load.image('planet1', '/assets/planet01.png');
  scene.load.image('planet2', '/assets/planet02.png');
  scene.load.image('planet3', '/assets/planet03.png');
  scene.load.image('planet4', '/assets/1295674594.png');
  scene.load.image('planet5', '/assets/planet05.png');
  scene.load.image('planet6', '/assets/planet06.png');
  scene.load.image('planet7', '/assets/planet07.png');
  scene.load.image('planet8', '/assets/planet08.png');
  scene.load.image('planet9', '/assets/planet09.png');

  // portal / black hole
  scene.load.spritesheet('blackHole', '/assets/2851306443.png', {
    frameWidth: 400,
    frameHeight: 400
  });
}

export function ensureBlackHoleAnim(scene) {
  // prevent duplicate create warnings
  if (scene.anims.exists('blackHoleLoop')) return;

  scene.anims.create({
    key: 'blackHoleLoop',
    frames: scene.anims.generateFrameNumbers('blackHole', { start: 0, end: 9 }),
    frameRate: 10,
    repeat: -1
  });
}
