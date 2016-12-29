var Turn = function(){
  var playerOnesTurn = true;

  this.isPlayerOne = function(){
    return playerOnesTurn;
  }
  
  this.toggle = function(){
    if (playerOnesTurn === true){
      playerOnesTurn = false;
    }
    else{
      playerOnesTurn = true;
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
}