var Turn = function(){
  var playerOnesTurn = true;

  this.isPlayerOne = function(){
    return playerOnesTurn;
  }
  
  this.toggle = function(){
    if (playerOnesTurn === true){
      playerOnesTurn = false;
      game.stage.backgroundColor = "#ff6961";
    }
    else{
      playerOnesTurn = true;
      game.stage.backgroundColor = "#fdfd96";
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