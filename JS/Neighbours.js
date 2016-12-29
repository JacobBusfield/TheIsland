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
    case 'star':
      if (tile.isoGroupIndex-7 >= 0){
        n.push(isoGroup.children[tile.isoGroupIndex - 7]);
      }
      if ((tile.isoGroupIndex-1 >= 0) && (tile.isoGroupIndex % 7 !== 0)){ // check for grid underlap
        n.push(isoGroup.children[tile.isoGroupIndex - 1]);
      }
      if ((tile.isoGroupIndex+1 < 49)&& (tile.isoGroupIndex % 7 !== 6)){  // check for grid overlap
        n.push(isoGroup.children[tile.isoGroupIndex + 1]);
      }
      if (tile.isoGroupIndex+7 < 49){
        n.push(isoGroup.children[tile.isoGroupIndex + 7]);
      }
      break;
      
    case 'ring-w': // RING-W CARRIES ON TO USE STAR-W
      if ((tile.isoGroupIndex-8 >= 0) && (tile.isoGroupIndex % 7 !== 0)){ // check for grid underlap
        if (isoGroup.children[tile.isoGroupIndex - 8].code !== 'w'){
          n.push(isoGroup.children[tile.isoGroupIndex - 8]);
        }
      }
      if ((tile.isoGroupIndex-6 < 49)&& (tile.isoGroupIndex % 7 !== 6)){  // check for grid overlap
        if (isoGroup.children[tile.isoGroupIndex - 6].code !== 'w'){
          n.push(isoGroup.children[tile.isoGroupIndex - 6]);
        }
      }
      if ((tile.isoGroupIndex+6 >= 0) && (tile.isoGroupIndex % 7 !== 0)){ // check for grid underlap
        if (isoGroup.children[tile.isoGroupIndex + 6].code !== 'w'){
          n.push(isoGroup.children[tile.isoGroupIndex + 6]);
        }
      }
      if ((tile.isoGroupIndex+8 < 49)&& (tile.isoGroupIndex % 7 !== 6)){  // check for grid overlap
        if (isoGroup.children[tile.isoGroupIndex + 8].code !== 'w'){
          n.push(isoGroup.children[tile.isoGroupIndex + 8]);
        }
      } // RING-W CARRIES ON TO USE STAR-W
    case 'star-w':
      if (tile.isoGroupIndex-7 >= 0){
        if (isoGroup.children[tile.isoGroupIndex - 7].code !== 'w'){
           n.push(isoGroup.children[tile.isoGroupIndex - 7]);
        }
      }
      if ((tile.isoGroupIndex-1 >= 0) && (tile.isoGroupIndex % 7 !== 0)){ // check for grid underlap
        if (isoGroup.children[tile.isoGroupIndex - 1].code !== 'w'){
          n.push(isoGroup.children[tile.isoGroupIndex - 1]);
        }
      }
      if ((tile.isoGroupIndex+1 < 49)&& (tile.isoGroupIndex % 7 !== 6)){  // check for grid overlap
        if (isoGroup.children[tile.isoGroupIndex + 1].code !== 'w'){
          n.push(isoGroup.children[tile.isoGroupIndex + 1]);
        }
      }
      if (tile.isoGroupIndex+7 < 49){
        if (isoGroup.children[tile.isoGroupIndex + 7].code !== 'w'){
          n.push(isoGroup.children[tile.isoGroupIndex + 7]);
        }
      }
      break;
  }
  return n;
}