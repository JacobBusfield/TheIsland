var isoGroup, cursorPos, cursor;
var water = [];

var Game = function (game) { };

Game.Boot = function (game) { };

Game.Boot.prototype =
{
    preload: function () {
        game.time.advancedTiming = true;
        game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        game.stage.backgroundColor = "#4a9b8d";
        
        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.1);
    },
    create: function () {
        // Create a group for our tiles.
        isoGroup = game.add.group();
        
        var tilemap = [
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74,
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74,
            74, 74, 92, 88, 88, 88, 88, 88, 95, 74, 74,
            74, 74, 106, 112, 112, 112, 112, 112, 102, 74, 74,
            74, 74, 106, 112, 112, 112, 112, 112, 102, 74, 74,
            74, 74, 106, 112, 112, 112, 112, 112, 102, 74, 74,
            74, 74, 106, 112, 112, 112, 112, 112, 102, 74, 74,
            74, 74, 106, 112, 112, 112, 112, 112, 102, 74, 74,
            74, 74, 93, 108, 108, 108, 108, 108, 97, 74, 74,
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74,
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74,
        ];
        
        var size = 54;
        
        var i = 0, tile;
        for (var xx = 0; xx < size*11; xx += size) {
            for (var yy = 0; yy < size*11; yy += size) {
                // Create a tile using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                tile = game.add.isoSprite(xx, yy, 0, 'tiles', tilemap[i], isoGroup);
                tile.anchor.set(0.5, 0.5);
                
                if (tilemap[i] === 74) {
                  water.push(tile);
                }
                
                i+=1;
            }
        }

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();
    },
    update: function () {
        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
        isoGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
            // If it does, do a little animation and tint change.
            if (!tile.selected && inBounds) {
                tile.selected = true;
                tile.tint = 0x86bfda;
                game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
            // If not, revert back to how it was.
            else if (tile.selected && !inBounds) {
                tile.selected = false;
                tile.tint = 0xffffff;
                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
        });
        
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
    }
};
