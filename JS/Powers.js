// Used to specify what powers, and their patters, are used for each tile. //
function getPowers(tile){
  var powers = [];
  switch(tile.code){
    case 'bh':
    case 'gh':
      powers.push({img: 'uid', pattern: 'star-w', changeTo: 'd'});
      powers.push({img: 'uig', pattern: 'ring-w', changeTo: 'g'});
      powers.push({img: 'uibox', pattern: 'single'});
  }
  return powers;
}