var PreLoad = {
    preload : function() {
		var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		var loadingText = game.add.text(0, 0, "Loading", style);
		loadingText.setTextBounds(0, 385, 1024, 100);
    
    var barX = (this.game.width - 600) / 2;
    var barY = this.game.height - 200;
    this.add.sprite(barX, barY, 'preloaderBarGray');
		this.preloadBar = this.add.sprite(barX, barY, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);
				
		
		/** GAME ASSETS **/
		// 
		// Images 
    game.load.image('w', 'Images/tiles/water.png');
    game.load.image('g', 'Images/tiles/grass.png');
    game.load.image('p', 'Images/tiles/path.png');
    
    game.load.image('bh', 'Images/tiles/bhgrass.png');
    game.load.image('gh', 'Images/tiles/ghgrass.png');
		
		// Sprite sheets
		game.load.spritesheet('imgStartButton', 'Images/startButton.png', 193, 67);
    
		// Audio
		// game.load.audio('sLaser', 'Audio/laser.wav');
		// game.load.audio('sExplode', 'Audio/explode.wav');
		// game.load.audio('sThunder', 'Audio/thunder.wav');
		// game.load.audio('sRaining', 'Audio/raining.wav');
		// game.load.audio('sMusic', 'Audio/noSleep.mp3');		
    },

    create: function () {
    //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    this.preloadBar.cropEnabled = false;
      
		// background image
		//this.bgImg = this.add.sprite(0, 0, 'imgStart');
    
    this.state.start('StartScreen');
    },
};
