import Boot from './scenes/Boot.js';

import LevelDwarfs from './scenes/Level_Dwarfs.js';
import LevelNeptune from './scenes/Level_Neptune.js';
// import LevelUranus from './scenes/Level_Uranus.js';
// import LevelSaturn from './scenes/Level_Saturn.js';
// import LevelJupiter from './scenes/Level_Jupiter.js';
// import LevelCeres from './scenes/Level_Ceres.js';
// import LevelMars from './scenes/Level_Mars.js';
// import LevelEarth from './scenes/Level_Earth.js';
// import LevelVenus from './scenes/Level_Venus.js';
// import LevelMercury from './scenes/Level_Mercury.js';
// import LevelSun from './scenes/Level_Sun.js';

import SurfaceNeptune from './scenes/surface/Surface_Neptune.js';
// import SurfaceUranus from './scenes/surface/Surface_Uranus.js';
// import SurfaceSaturn from './scenes/surface/Surface_Saturn.js';
// import SurfaceJupiter from './scenes/surface/Surface_Jupiter.js';
// import SurfaceMars from './scenes/surface/Surface_Mars.js';
// import SurfaceEarth from './scenes/surface/Surface_Earth.js';
// import SurfaceVenus from './scenes/surface/Surface_Venus.js';
// import SurfaceMercury from './scenes/surface/Surface_Mercury.js';
// import SurfaceSun from './scenes/surface/Surface_Sun.js';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 300 }, debug: true }
  },
  scene: [
    Boot,

    LevelDwarfs,
    LevelNeptune,
    SurfaceNeptune //,
    // LevelUranus,
    // SurfaceUranus,
    // LevelSaturn,
    // SurfaceSaturn,
    // LevelJupiter,
    // SurfaceJupiter,

    // LevelCeres, // bonus between Jupiter and Mars (no surface)

    // LevelMars,
    // SurfaceMars,
    // LevelEarth,
    // SurfaceEarth,
    // LevelVenus,
    // SurfaceVenus,
    // LevelMercury,
    // SurfaceMercury,

    // LevelSun,
    // SurfaceSun
  ]
};

new Phaser.Game(config);
