// Used to specify what powers, and their patters, are used for each tile. //
function getPowers(tile){
  var powers = [];
  switch(tile.code){
    case 'h':
      powers.push({img: 'uibc', pattern: 'star-w'});
      powers.push({img: 'uibox', pattern: 'star'});
      powers.push({img: 'uibox', pattern: 'single'});
  }
  return powers;
}