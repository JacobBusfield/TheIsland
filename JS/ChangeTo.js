// Used to change tiles.
changeTo = function(changeCode){
  
  this.code = changeCode;
  this.loadTexture(changeCode);
  
  switch(changeCode){
    case 'w':
      water.push(this);
      
    case 'g':
    case 'p':
    case 'd':
      this.anchor.set(0.5, 0);
      break;
      
    case 'bh':
    case 'gh':
      this.anchor.set(0.5, 0.31);
      break;
  }
}