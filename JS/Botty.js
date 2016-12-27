var Botty = function (game) {
  //Phaser.Sprite.call(this, game, x, y, 'imgbotty');
  //game.add.isoSprite(128, 128, 0, 'imgbotty', 0, this);
  var botty = game.add.isoSprite(500, 500, 0, 'imgbotty', 0);
    
  game.physics.isoArcade.enable(botty);
  botty.anchor.set(0.5);
  
  botty.body.collideWorldBounds = true;
  
  // Set up our controls.
  game.cursors = game.input.keyboard.createCursorKeys();

  game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
  ]);
  
  botty.update = function(){
// Move the player at this speed.
    var speed = 100;
  
    if (game.cursors.up.isDown) {
        botty.body.velocity.y = -speed;
    }
    else if (game.cursors.down.isDown) {
        botty.body.velocity.y = speed;
    }
    else {
        botty.body.velocity.y = 0;
    }

    if (game.cursors.left.isDown) {
        botty.body.velocity.x = -speed;
    }
    else if (game.cursors.right.isDown) {
        botty.body.velocity.x = speed;
    }
    else {
        botty.body.velocity.x = 0;
    }
  };

  return botty;
}