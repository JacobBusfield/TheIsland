// Used to specify what powers, and their patters, are used for each tile. //
function getPowers(tile){
  // START by disabling enemy tiles.
  if((tile.code.charAt(0) == 'b') && (!game.turn.isPlayerOne())){
    return [];
  }
  else if ((tile.code.charAt(0) == 'g') && (game.turn.isPlayerOne())){
    return [];
  }
  
  // NEXT disable tile not adjacent to freindly structures.
  if(!isTilePlayable(tile)){
    return [];
  }
    
  // OK - Get powers available to the player
  var powers = [];
  switch(tile.code){
    case 'bh':
    case 'gh':
      powers.push({img: 'uid', pattern: 'star-w', changeTo: 'd'});
      powers.push({img: 'uig', pattern: 'ring-w', changeTo: 'g'});
      break;
    case 'd':
      powers.push({img:'ui'+game.turn.getPrefix()+'h', pattern: 'me', changeTo: game.turn.getPrefix()+'h'});
      powers.push({img:'ui'+game.turn.getPrefix()+'c', pattern: 'me', changeTo: game.turn.getPrefix()+'c'});
      break;
    case 'bc':
    case 'gc':
      powers.push({img:'ui'+game.turn.getPrefix()+'cup', pattern: 'me', changeTo: game.turn.getPrefix()+'c2'});
      powers.push({img: 'uig', pattern: 'ring-w', changeTo: 'g'});
      break;
    case 'bc2':
    case 'gc2':
      powers.push({img:'ui'+game.turn.getPrefix()+'cup', pattern: 'me', changeTo: game.turn.getPrefix()+'c3'});
      powers.push({img: 'uig', pattern: 'ring2-w', changeTo: 'g'});
      break;
    case 'bc3':
    case 'gc3':
      powers.push({img: 'uig', pattern: 'ring3-w', changeTo: 'g'});
      break;
  }
  return powers;
}