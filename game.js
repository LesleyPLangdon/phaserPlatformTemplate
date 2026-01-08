
var config = {
    type: Phaser.AUTO,  // Will automatically use WebGL if available, else falls back to Canvas
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',  // We'll be using Phaser's Arcade physics plugin
        arcade: {
            gravity: { y: 300 },  // This is the gravity value to be used in the game
            debug: true  // This lets you visualize the physics bodies if set to true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    // This is where we'll load our game assets
    this.load.image('background', 'spaceBackground2.png');
    this.load.image('ground', 'assets/grass.png');
    this.load.image('player', 'assets/alienGreen_walk1.png');
    this.load.image('box', 'assets/boxCoin_disabled.png');
    this.load.image('planet1', 'assets/planet01.png');
    this.load.image('planet9', 'assets/planet09.png');
    this.load.image('planet4', 'assets/1295674594.png');
    this.load.image('planet2', 'assets/planet02.png');
    this.load.image('planet3', 'assets/planet03.png');
    this.load.image('planet5', 'assets/planet05.png');
    this.load.image('planet6', 'assets/planet06.png');
    this.load.image('planet7', 'assets/planet07.png');
    this.load.image('planet8', 'assets/planet08.png');
    this.load.spritesheet('myGif', '2851306443.png', {
        frameWidth: 400, // Replace with your frame's width
        frameHeight: 400 // Replace with your frame's height
    });
}

let background;
let player;
let platforms;
let planet1;
let planet9;
let planet4;

// planet1.setDisplaySize(100, 100);
// planet1.refreshBody();



function create() {
   // Set world bounds
    this.physics.world.setBounds(0, 0, 4000, 2000);  // The second parameter is the world height
    background = this.add.image(0, 0, 'background');
    background.setScale(2, 2);

    platforms = this.physics.add.staticGroup();  // Create a group for platforms
    var planetY = 600;
    var planetDiameter = 75;
    var planetX = 75;
    // Add ground platforms
    platforms.create(planetX, planetY, 'planet1').setDisplaySize(planetDiameter * 2, planetDiameter * 2).refreshBody().body.setCircle(planetDiameter).setOffset(15, 20);
    
    planetX += (planetDiameter * 2) + (Math.random() * 200);
    planetY = 550 + Math.random() * 300;
    planetDiameter = 75 + Math.random() * 150;
    platforms.create(planetX, planetY, 'planet9').setDisplaySize(planetDiameter, planetDiameter).refreshBody().body.setCircle(planetDiameter * .5).setOffset(20, 25);
    
    planetX += (planetDiameter * 2) + (Math.random() * 200);
    planetY = 550 + Math.random() * 300;
    planetDiameter = 75 + Math.random() * 150;
    platforms.create(planetX, planetY, 'planet4').setDisplaySize(planetDiameter, planetDiameter).refreshBody().body.setCircle(planetDiameter * .5).setOffset(0, 5);
    
    planetX += (planetDiameter * 2) + (Math.random() * 200);
    planetY = 550 + Math.random() * 300;
    planetDiameter = 75 + Math.random() * 150;
    platforms.create(planetX, planetY, 'planet5').setDisplaySize(planetDiameter, planetDiameter).refreshBody().body.setCircle(planetDiameter * .5).setOffset(20, 25);
    
    platforms.create(1150, 750, 'planet6').setDisplaySize(100, 100).refreshBody().body.setCircle(50).setOffset(0, 5);
    platforms.create(1300, 850, 'planet7').setDisplaySize(100, 100).refreshBody().body.setCircle(50).setOffset(0, 5);
   
   

    player = this.physics.add.sprite(50, 50, 'player');  // Create player sprite
    player.setSize(120, 150).setOffset(0, 100);
    player.setBounce(0.2);  // Set player bounce
    player.setCollideWorldBounds(true);  // Keep player within game world bounds

    // Set up collisions between player and platforms
    this.physics.add.collider(player, platforms);

    // planet1 = this.physics.add.sprite(300, 0, 'planet1');  // Create player sprite
    // planet1.setDisplaySize(100, 100);
    // planet1.refreshBody();
    // planet1.setCollideWorldBounds(true);  // Keep player within game world bounds

    // Set up collisions between player and platforms
    // this.physics.add.collider(player, platforms);

     // Make camera follow player and stay within world bounds
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    this.cameras.main.setBounds(0, 0, 4000, 2000);  // The second parameter is the world height

    this.anims.create({
        key: 'gifAnimation',
        frames: this.anims.generateFrameNumbers('myGif', { start: 0, end: 9 }), // Adjust as needed
        frameRate: 10,
        repeat: -1
    });

    let gifSprite = this.add.sprite(1900, 500, 'myGif');
    gifSprite.play('gifAnimation');
    // gifSprite.setScale(2); // Optional: Scale up
    gifSprite.setOrigin(0.5, 0.5); // Optional: Center origin
}


function update() {
    // Create cursor keys for player movement
    let cursors = this.input.keyboard.createCursorKeys();

    // Reset player velocity
    player.setVelocityX(0);

    // Move player left, right, or jump
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
    }
}

