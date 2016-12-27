var Selected = function(){
    var selected;
    var active = false;
  
    this.isActive = function(){
      return active;
    };
    
    this.setInactive = function(){
      active = false;
    };
    
    this.get = function(){
      if (active){
        return selected;
      }
      return false;
    };
    
    this.setToTile = function(tile){
      selected = tile;
      active = true;
    };
    
    this.getPos = function(){
      return {
        x: selected.x,
        y: selected.y
      };
    };
}