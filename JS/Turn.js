var Turn = function(){
  var playerOnesTurn = true;

  this.isPlayerOne = function(){
    return playerOnesTurn;
  }
  
  this.toggle = function(){
    if (playerOnesTurn === true){
      playerOnesTurn = false;
      tweenTint(game.bgImg, 0xfdfd96, 0xff6961, 1000);
    }
    else{
      playerOnesTurn = true;
      tweenTint(game.bgImg, 0xff6961, 0xfdfd96, 1000);
    }
  }
  
  this.tint = function(){
    if (playerOnesTurn === true){
      return 0xcfcf00;
    }
    else{
      return 0xff5555;
    }
  }
  
  this.getPrefix = function(){
    if (playerOnesTurn === true){
      return 'b';
    }
    else{
      return 'g';
    }
  }
}

function isTilePlayable(tile){
  var tileNotAdjacentToFriendlyBuilding = true;
  getNeighbours(tile, 'ring-w').forEach(function (neighbour) {
    if (neighbour.code === (game.turn.getPrefix()+'h')){
      tileNotAdjacentToFriendlyBuilding = false;
    }
  });
  if (tileNotAdjacentToFriendlyBuilding && (tile.code !== (game.turn.getPrefix()+'h'))){
    return false;
  }
  return true;
}

function tweenTint(obj, startColor, endColor, time) {
  var colorBlend = {step: 0};    
  var colorTween = game.add.tween(colorBlend).to({step: 100}, time);          
  colorTween.onUpdateCallback(function() {      
    obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);       
  });         
  obj.tint = startColor;  
  colorTween.start();
}