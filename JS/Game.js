var isoGroup, cursorPos, cursor;
var water = [];

var Game = function (game) { };

Game.Boot = function (game) { };

var selected = new Selected();

Game.Boot.prototype =
{
    preload: function () {
        game.time.advancedTiming = true;
        game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        game.stage.backgroundColor = "#2ebdd3";
        
        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.3);
    },
    create: function () {
        // Create a group for our tiles.
        isoGroup = game.add.group();
          
        // Set the global gravity for IsoArcade.
        game.physics.isoArcade.gravity.setTo(0, 0, -500);
        
        var tilemap = [
            'w', 'w', 'w', 'w', 'w', 'w', 'w',
            'w', 17, 17, 17, 17, 17, 'w',
            'w', 17, 17, 17, 17, 17, 'w',
            'w', 17, 17, 17, 17, 17, 'w',
            'w', 17, 17, 17, 17, 17, 'w',
            'w', 17, 17, 17, 17, 17, 'w',
            'w', 'w', 'w', 'w', 'w', 'w', 'w',
        ];
        
        // Add tiles to map
        var size = 76;
        var i = 0, tile;
        for (var xx = 0; xx < size*7; xx += size) {
            for (var yy = 0; yy < size*7; yy += size) {
                // Create a tile using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                if (tilemap[i] === 'w'){
                  tile = game.add.isoSprite(xx, yy, 0, 'water', 1, isoGroup);
                }
                else{
                  tile = game.add.isoSprite(xx, yy, 0, 'tiles', tilemap[i], isoGroup);
                }
                
                tile.anchor.set(0.5, 0);
                
                if (tilemap[i] === 'w') {
                  water.push(tile);
                }
                
                i+=1;
            }
        }

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();
        
        // click event
        game.input.onDown.add(function () {
          var nothingClicked = true;
          isoGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
            if(inBounds){
              nothingClicked = false;
              selected.setToTile(tile);
              cursorPos.checkRequired = false;
            }
          });
          if (nothingClicked) {
            selected.setInactive();    
          }
        }, this);
    },
    update: function () {
        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        // Loop through all tiles. If selected turn red, if hoverered over tint, else set to normal.
        isoGroup.forEach(function (tile) {
            if (tile === selected.get()){
              tile.tint = 0xff0000;   
            }   
            else{
              var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
              if (!tile.selected && inBounds) {
                tile.selected = true;
                tile.tint = 0x86bfda;
                game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
              }
              else if (tile.selected && !inBounds) {
                tile.selected = false;
                tile.tint = 0xffffff;
                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
              }  
            }
        });
        
        // Wobble water tiles
        water.forEach(function (w) {
            w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
            w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
        });
    },
    render: function () {
        isoGroup.forEach(function (tile) {
            game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
        });
      
        game.debug.text("Move your mouse around!", 2, 36, "#ffffff");
        game.debug.text(game.time.fps || '--', 2, 14, "#ffffff");
        game.debug.text("Cursor:  X: " + cursorPos.x.toFixed(2)+ " Y: " + cursorPos.y.toFixed(2), 2, 58, "#ffffff");
        if (selected.isActive()){
          game.debug.text("Cursor:  X: " + selected.getPos().x.toFixed(2)+ " Y: " + selected.getPos().y.toFixed(2), 2, 70, "#ffffff");
        }
    }
};
