import { loadSharedAssets } from '../helpers/assets.js';

export default {
  key: 'Boot',
  preload() {
    loadSharedAssets(this);
  },
  create() {
    // Start your first level (dwarfs)
    this.scene.start('Level_Dwarfs', { difficulty: 0 });
  }
};
