var isoGroup;
var selected = new Selected(); 
var ui; 
  
var Grid = function(game){
  isoGroup = game.add.group();
  ui = new UI();
  
  this.grid = [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'g', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'gh', 'g', 'g', 'g', 'bh', 'w'],
    ['w', 'g', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w']];
    
  this.water = [];

  // Add tiles to map
  var size = 76;
  var i=0, j, tile;
  for (var xx = 0; xx < size*7; xx += size) {
    j=0;
    for (var yy = 0; yy < size*7; yy += size) {
      // Create a tile using the new game.add.isoSprite factory method at the specified position.
      // The last parameter is the group you want to add it to (just like game.add.sprite)
      tile = game.add.isoSprite(xx, yy, 0, this.grid[i][j], 1, isoGroup);
      tile.isoGroupIndex = (7*i)+j;
      if(this.grid[i][j] === 'bh' || this.grid[i][j] === 'gh'){
        tile.anchor.set(0.5, 0.31);
        tile.code = 'h';
      }
      else if (this.grid[i][j] === 'w') {
        tile.anchor.set(0.5, 0);
        tile.code = 'w';
        this.water.push(tile);
      }
      else{
        tile.anchor.set(0.5, 0);
      }
      j+=1;
    }
    i+=1;
  }
  
  // click event
  game.input.tapRate = 500; 
  game.input.onTap.add(function () {
    var nothingClicked = true;

    if (!ui.isBeingUsed()){
      ui.clear();
      selected.clearNeighbours();
      
      isoGroup.forEach(function (tile) {
        var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
        if(inBounds){
          nothingClicked = false;
          selected.setToTile(tile);
          
          tile.tint = 0xff0000;
          ui.addPopUp(tile);
        }
      });
      if (nothingClicked) {
        selected.setInactive();
      }
    }
  }, this);
  
  this.update = function(){  
    // Unselected/ not-neighbour tiles allow scroll over animations.
    isoGroup.forEach(function (tile) {
      if ((tile !== selected.get()) && !selected.checkNeighbours(tile.isoGroupIndex)){
        var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
        if (!tile.selected && inBounds && !ui.isBeingUsed()) {
          tile.selected = true;
          tile.tint = 0x86bfda;
          game.add.tween(tile).to({ isoZ: 12 }, 200, Phaser.Easing.Quadratic.InOut, true);
        }
        else if (!inBounds) {
          tile.tint = 0xffffff;
          
          if (tile.selected){
            tile.selected = false;
            game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
          }
        }  
      }
    });

    // Wobble water tiles
    this.water.forEach(function (w) {
        w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
        w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
    });
  }
}