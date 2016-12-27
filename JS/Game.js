var cursorPos, cursor;

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
        game.stage.backgroundColor = "#2ebdd3";
        
        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.3);
    },
    create: function () {
        
        // Create a group for our tiles.
        
        this.grid = new Grid(game);
          
        // Set the global gravity for IsoArcade.
        game.physics.isoArcade.gravity.setTo(0, 0, -500);
        
        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();
    },
    update: function () {
        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        this.grid.update();
    },
    render: function () {    
        game.debug.text(game.time.fps || '--', 2, 14, "#ffffff");
        game.debug.text("Cursor:  X: " + cursorPos.x.toFixed(2)+ " Y: " + cursorPos.y.toFixed(2), 2, 36, "#ffffff");
        if (selected.isActive()){
         game.debug.text("Cursor:  X: " + selected.getPos().x.toFixed(2)+ " Y: " + selected.getPos().y.toFixed(2), 2, 58, "#ffffff");
        }
    }
};
