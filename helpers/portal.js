import { ensureBlackHoleAnim } from './assets.js';

export function createBlackHolePortal(scene, x, y, player, opts = {}) {
  const {
    radius = 30,
    targetScene = null,       // e.g. 'Surface_Neptune'
    returnScene = null,       // e.g. 'Level_Neptune'
    nextScene = null          // e.g. 'Level_Uranus' (when leaving surface)
  } = opts;

  ensureBlackHoleAnim(scene);

  const blackHole = scene.physics.add.sprite(x, y, 'blackHole');
  blackHole.play('blackHoleLoop');
  blackHole.setOrigin(0.5, 0.5);
  blackHole.setImmovable(true);
  blackHole.body.setAllowGravity(false);

  blackHole.body.setCircle(
    radius,
    blackHole.width / 2 - radius,
    blackHole.height / 2 - radius
  );

  let triggered = false;

  scene.physics.add.overlap(player, blackHole, () => {
    if (triggered) return;
    triggered = true;

    player.setVelocity(0, 0);
    player.body.enable = false;

    scene.cameras.main.fadeOut(300);
    scene.cameras.main.once('camerafadeoutcomplete', () => {
      if (targetScene) {
        // Send metadata so the surface can return
        scene.scene.start(targetScene, {
          returnScene,
          nextScene
        });
      } else if (nextScene) {
        scene.scene.start(nextScene);
      }
    });
  });

  return blackHole;
}
