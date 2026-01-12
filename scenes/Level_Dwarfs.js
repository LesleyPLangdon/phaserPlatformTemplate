import { createPlatformGroup, createRandomPlanetChain } from '../helpers/planets.js';
import { createPlayer, updatePlayerMovement } from '../helpers/player.js';
import { setupCamera } from '../helpers/camera.js';
import { createBlackHolePortal } from '../helpers/portal.js';

export default {
  key: 'Level_Dwarfs',

  create() {
    const worldWidth = 3500;
    const worldHeight = 2000;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
    bg.setScale(2, 2);

    this.platforms = createPlatformGroup(this);
    const { endX } = createRandomPlanetChain(this.platforms, { count: 4 });

    this.player = createPlayer(this, 100, 50);
    this.physics.add.collider(this.player, this.platforms);

    setupCamera(this, this.player, worldWidth, worldHeight);

    // end portal goes to Neptune main level
    createBlackHolePortal(this, endX + 250, 500, this.player, {
      nextScene: 'Level_Neptune'
    });
  },

  update() {
    updatePlayerMovement(this, this.player);
  }
};
