import { createPlatformGroup, createRandomPlanetChain } from '../helpers/planets.js';
import { createPlayer, updatePlayerMovement } from '../helpers/player.js';
import { setupCamera } from '../helpers/camera.js';
import { createBlackHolePortal } from '../helpers/portal.js';

export default {
  key: 'Level_Neptune',

  create(data) {
    // world bounds (adjust per level)
    const worldWidth = 4000;
    const worldHeight = 2000;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // background
    const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
    bg.setScale(2, 2);

    // platforms + planet chain
    this.platforms = createPlatformGroup(this);
    const { endX } = createRandomPlanetChain(this.platforms, { count: 7 });

    // player spawn (if returning from surface, you can pass coords later)
    this.player = createPlayer(this, 100, 50);

    // collisions
    this.physics.add.collider(this.player, this.platforms);

    // camera
    setupCamera(this, this.player, worldWidth, worldHeight);

    // black hole portal to Neptune surface
    createBlackHolePortal(this, endX + 250, 500, this.player, {
      targetScene: 'Surface_Neptune',
      returnScene: 'Level_Neptune',
      nextScene: 'Level_Uranus'
    });
  },

  update() {
    updatePlayerMovement(this, this.player);
  }
};
