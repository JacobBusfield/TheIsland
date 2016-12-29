function toggleNeighbours(tile, pattern){
  var n = getNeighbours(tile, pattern);
  n.forEach(function (tile) {
    selected.setNeighbours(tile.isoGroupIndex);
    tile.tint = game.turn.tint();
  });
}

// -- Used to specify which tiles a pattern highlights and then uses. --//
function getNeighbours(tile, pattern){
  var n = [];
  
  switch(pattern){
    case 'me':
      return [isoGroup.children[tile.isoGroupIndex]];
      break;
      
    case 'star-w':
      return neighbourCheckFollowing(
        tile.isoGroupIndex,
        [-7, -1, 1, 7],
        true
      );
      break;
      
    case 'ring-w':
      return neighbourCheckFollowing(
        tile.isoGroupIndex,
        [-8, -7, -6, -1, 1, 6, 7, 8],
        true
      );
      break;  
      
    case 'ring2-w':
      return neighbourCheckFollowing(
        tile.isoGroupIndex,
        [-16, -15, -14, -13, -12, -9, -5, -2, 2, 5, 9, 12, 13, 14, 15, 16],
        true
      );
      break;
      
    case 'ring3-w':
      return neighbourCheckFollowing(
        tile.isoGroupIndex,
        [-24, -23, -22, -21, -20, -19, -18, -17, -11, -10, -4, -3,
          24,  23,  22,  21,  20,  19,  18,  17,  11,  10,  4,  3],
        true
      );
      break;   
  }
  return n;
}

function neighbourCheckFollowing(index, offsets, removeWater){
  var indices = [];
  
  for(var i = 0; i < offsets.length; i++){
    var sum = index + offsets[i];
    if((sum < 49) && (sum >= 0)){                 // ignore out of bounds
      if ((index % 7 === 5) && (sum % 7 === 1)){}     // ignore overflow
      else if ((index % 7 === 1) && (sum % 7 === 5)){}// ignore underflow
      else if (removeWater && isoGroup.children[sum].code === 'w'){}//ignore water if desired
      else{
        indices.push(isoGroup.children[sum]);
      }
    }
  }
  return indices;
}