import { createPlayer, updatePlayerMovement } from '../../helpers/player.js';
import { setupCamera } from '../../helpers/camera.js';

export default {
  key: 'Surface_Neptune',

  create(data) {
    // data.returnScene, data.nextScene
    this.returnScene = data?.returnScene ?? 'Level_Neptune';
    this.nextScene = data?.nextScene ?? 'Level_Uranus';

    const worldWidth = 2000;
    const worldHeight = 1200;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
    bg.setScale(2, 2);

    // simple ground for now
    this.ground = this.physics.add.staticGroup();
    this.ground.create(600, 900, 'ground').setScale(6, 2).refreshBody();

    this.player = createPlayer(this, 100, 50);
    this.physics.add.collider(this.player, this.ground);

    setupCamera(this, this.player, worldWidth, worldHeight);

    // Exit trigger: touch a marker box / reach far right, etc. (placeholder)
    const exit = this.physics.add.staticImage(1800, 800, 'box');
    this.physics.add.overlap(this.player, exit, () => {
      this.cameras.main.fadeOut(300);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        // Return to main level OR proceed to next level (your choice)
        this.scene.start(this.returnScene);
        // OR: this.scene.start(this.nextScene);
      });
    });
  },

  update() {
    updatePlayerMovement(this, this.player);
  }
};
