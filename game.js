// -------------------- Phaser Game Config --------------------
var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// -------------------- Helpers --------------------
function randBetween(min, max) {
    return min + Math.random() * (max - min);
}

/**
 * Creates a run of static, circular "planet" platforms with randomized size + Y,
 * while advancing X so planets don't pile up.
 *
 * @param {Phaser.Scene} scene
 * @param {Phaser.Physics.Arcade.StaticGroup} platforms
 * @param {string[]} planetKeys  - list of texture keys (e.g., ["planet1","planet2"...])
 * @param {object} options
 * @returns {Phaser.GameObjects.GameObject[]} created planet objects
 */
function placeRandomPlanets(scene, platforms, planetKeys, options = {}) {
    const worldW = options.worldWidth ?? 4000;

    const startX = options.startX ?? 150;

    const yMin = options.yMin ?? 550;
    const yMax = options.yMax ?? 900;

    const minDiameter = options.minDiameter ?? 75;
    const maxDiameter = options.maxDiameter ?? 200;

    const gapMin = options.gapMin ?? 100;
    const gapMax = options.gapMax ?? 260;

    // reduces circle radius a bit so collision is more forgiving
    const bodyPadding = options.bodyPadding ?? 8;

    let x = startX;
    const created = [];

    for (const key of planetKeys) {
        const diameter = randBetween(minDiameter, maxDiameter);
        const y = randBetween(yMin, yMax);

        // Stop if we reach the end of the world (optional)
        if (x > worldW - diameter) break;

        const planet = platforms
            .create(x, y, key)
            .setDisplaySize(diameter, diameter);

        // Must refresh after display size changes
        planet.refreshBody();

        // Make static body circular and centered
        const radius = (diameter / 2) - bodyPadding;
        if (planet.body && radius > 5) {
            planet.body.setCircle(radius);

            // Center the circle inside the display-sized sprite
            const offset = (diameter / 2) - radius;
            planet.body.setOffset(offset, offset);
        }

        created.push(planet);

        // Advance X for the next planet
        x += diameter + randBetween(gapMin, gapMax);
    }

    return created;
}

// -------------------- Globals --------------------
let background;
let player;
let platforms;

// -------------------- Preload --------------------
function preload() {
    this.load.image('background', 'spaceBackground2.png');
    this.load.image('ground', 'assets/grass.png');
    this.load.image('player', 'assets/alienGreen_walk1.png');
    this.load.image('box', 'assets/boxCoin_disabled.png');

    // Planets (as images)
    this.load.image('planet1', 'assets/planet01.png');
    this.load.image('planet2', 'assets/planet02.png');
    this.load.image('planet3', 'assets/planet03.png');
    this.load.image('planet4', 'assets/1295674594.png');
    this.load.image('planet5', 'assets/planet05.png');
    this.load.image('planet6', 'assets/planet06.png');
    this.load.image('planet7', 'assets/planet07.png');
    this.load.image('planet8', 'assets/planet08.png');
    this.load.image('planet9', 'assets/planet09.png');

    // Black hole spritesheet (animation)
    this.load.spritesheet('blackHole', '2851306443.png', {
        frameWidth: 400,
        frameHeight: 400
    });
}

// -------------------- Create --------------------
function create() {
    // World bounds
    this.physics.world.setBounds(0, 0, 4000, 2000);

    // Background
    background = this.add.image(0, 0, 'background');
    background.setScale(2, 2);

    // Platforms group (static)
    platforms = this.physics.add.staticGroup();

    // --- Random planet platforms ---
    // If you want one of each:
    const planetKeys = [
        "planet1", "planet2", "planet3", "planet4", "planet5",
        "planet6", "planet7", "planet8", "planet9"
    ];

    placeRandomPlanets(this, platforms, planetKeys, {
        startX: 150,
        yMin: 550,
        yMax: 900,
        minDiameter: 75,
        maxDiameter: 200,
        gapMin: 100,
        gapMax: 260,
        bodyPadding: 8,
        worldWidth: 4000
    });

    // Player
    player = this.physics.add.sprite(50, 50, 'player');
    player.setSize(120, 150).setOffset(0, 100);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Collisions
    this.physics.add.collider(player, platforms);

    // Camera follow
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    this.cameras.main.setBounds(0, 0, 4000, 2000);

    // -------------------- Black Hole (left at end for now) --------------------
    this.anims.create({
        key: 'gifAnimation',
        frames: this.anims.generateFrameNumbers('blackHole', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });

    let gifSprite = this.add.sprite(1900, 500, 'blackHole');
    gifSprite.play('gifAnimation');
    gifSprite.setOrigin(0.5, 0.5);
}

// -------------------- Update --------------------
function update() {
    let cursors = this.input.keyboard.createCursorKeys();

    // Reset horizontal velocity each frame
    player.setVelocityX(0);

    // Left/right movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    }

    // Jump (separate so you can jump while moving)
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
    }
}
