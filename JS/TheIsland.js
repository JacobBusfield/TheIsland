var game;

game = new Phaser.Game(1024, 600, Phaser.AUTO, 'phaserGame');

game.state.add('PreBoot', PreBoot);
game.state.add('PreLoad', PreLoad);
game.state.add('StartScreen', StartScreen);
game.state.add('Game', Game.Boot);
game.state.start('PreBoot');