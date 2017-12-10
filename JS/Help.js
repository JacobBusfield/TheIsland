var Help = function(){
  var visible = false;

  var helpButton = game.add.button(game.world.width - 80, 10, 'uiq', helpCallback, this, 1,0);
  helpButton.inputEnabled = true;

  var helpDisplay = game.add.sprite(game.world.centerX, game.world.centerY, 'tutorial');
  helpDisplay.alpha = 0;
  helpDisplay.anchor.set(0.5);

  var closeButton = game.add.button(game.world.width - 80, 10, 'uic', closeCallback, this, 1, 0);
  closeButton.inputEnabled = false;
  closeButton.alpha = 0;

  function helpCallback(){
    if (!visible){
      var t = game.add.tween(helpDisplay).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
      t.onComplete.add(toggleVisibleOn, game);
      game.add.tween(closeButton).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    }
  }

  function closeCallback() {
    if (visible){
      var t = game.add.tween(helpDisplay).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
      t.onComplete.add(toggleVisibleOff, game);
      game.add.tween(closeButton).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    }
  }

  function toggleVisibleOff(){
    visible = false;
    helpButton.inputEnabled = true;
    closeButton.inputEnabled = false;
  }

  function toggleVisibleOn(){
    visible = true;
    helpButton.inputEnabled = false;
    closeButton.inputEnabled = true;
  }
}
