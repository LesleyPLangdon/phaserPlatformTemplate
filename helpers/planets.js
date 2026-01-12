export function createPlatformGroup(scene) {
  return scene.physics.add.staticGroup();
}

// Creates a start planet + a chain of random planets using planet2..planet9 keys
export function createRandomPlanetChain(platforms, opts = {}) {
  const {
    startX = 100,
    startY = 550,
    startSize = 150,
    count = 7,              // how many extra planets
    minSize = 75,
    maxSize = 205,
    minGap = 130,
    maxExtraGap = 130,
    minY = 500,
    maxY = 700
  } = opts;

  // Start planet uses planet1 for now
  const start = platforms.create(startX, startY, 'planet1');
  start.setDisplaySize(startSize, startSize);
  start.refreshBody();
  start.body.setCircle(50);
  start.body.setOffset(25, 25);

  let planetX = startX;
  let lastSize = startSize;

  for (let i = 0; i < count; i++) {
    const size = minSize + Math.random() * (maxSize - minSize);
    const gap = minGap + Math.random() * maxExtraGap;
    planetX += (lastSize / 2) + (size / 2) + gap;

    const y = minY + Math.random() * (maxY - minY);

    // cycle planet2..planet9
    const keyIndex = 2 + (i % 8);
    const planetKey = `planet${keyIndex}`;

    const p = platforms.create(planetX, y, planetKey);
    p.setDisplaySize(size, size);
    p.refreshBody();

    // circle collider centered-ish
    const radius = size * 0.35;
    p.body.setCircle(radius);
    p.body.setOffset(size * 0.15, size * 0.15);

    lastSize = size;
  }

  return { endX: planetX, endY: startY };
}
