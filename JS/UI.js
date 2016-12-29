var uiGroup;

var UI = function(){
  uiGroup = game.add.group();
    
  this.addPopUp = function(tile){
    var powers = getPowers(tile);
    var widthByTwo = (powers.length - 1) * 110 / 2;
    var i;
    
    i = 0;
    powers.forEach(function (power) {
      addUIElement(power, tile, tile.x - widthByTwo + (110 * i), tile.y-50);
      i+=1;
    });
  }
  
  this.clear = function(){   
    uiGroup.forEach(function(box) {
      var tween = game.add.tween(box);  
      tween.to({ y: box.y-25 }, 400, Phaser.Easing.Quadratic.InOut, true);
      tween.onComplete.add(function () { 
        uiGroup.removeChild(box);    
      });
      game.add.tween(box).to({ alpha: 0 }, 400, Phaser.Easing.Quadratic.InOut, true);      
      tween.start();}
    );
  };
  
  this.isBeingUsed = function(){
    if (typeof uiGroup.hovered === 'undefined'){
      return false;
    }
    return uiGroup.hovered;
  }
  
  // Private Functions
  function addUIElement(power, tile, x, y){
    var box = uiGroup.getFirstDead();
    
    if (box === null) {
      var box = new Phaser.Sprite(game, x, y, power.img);
      box.tile = tile; // (above) need to do after NEW but before EVENTS  
      box.anchor.setTo(0.5, 1);
      box.inputEnabled = true;
      
      box.events.onInputOver.add(function(){
        if(selected.isActive()){ // Checking active fixes bug of unselect and hovering on panel.
          game.add.tween(box).to({ tint: game.turn.tint() }, 100, Phaser.Easing.Quadratic.InOut, true);
          toggleNeighbours(tile, power.pattern);
          uiGroup.hovered = true;
        }
      }, this);
      box.events.onInputOut.add(function(){
        game.add.tween(box).to({ tint: 0xFFFFFF }, 100, Phaser.Easing.Quadratic.InOut, true);
        selected.clearNeighbours();
        uiGroup.hovered = false;
      }, this);
      box.events.onInputDown.add(function(){
        uiGroup.hovered = true;
      }, this);
      box.events.onInputUp.add(function(){
        ui.clear();
        selected.clearNeighbours();
        selected.setInactive();
        
        getNeighbours(box.tile, power.pattern).forEach(function (tile) {
          tile.changeTo(power.changeTo);
        });
        
        game.turn.toggle();
        
        uiGroup.hovered = false;
      }, this);
      
      uiGroup.add(box);
    }
    else{
      box.tile = tile;  // REPEAT: (above) need to do if no inst.
      box.loadTexture(img);
    }
    box.revive();
    box.x = x;
    box.y = y+20;
    box.alpha = 0;

    game.add.tween(box).to({ alpha: 1 }, 200, Phaser.Easing.Quadratic.InOut, true);
    game.add.tween(box).to({ y: y }, 200, Phaser.Easing.Quadratic.InOut, true);
  };
}