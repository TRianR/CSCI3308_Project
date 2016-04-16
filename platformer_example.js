// # Timmy's Lost Dimension Platformer with Quintus Engine
//
// [Run the example](../quintus/examples/platformer/index.html)
// WARNING: this game must be run from a non-file:// url
// as it loads a level json file.

window.addEventListener("load",function() {

// Set up an instance of the Quintus engine  and include
// the Sprites, Scenes, Input and 2D module
var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
        .setup('quintusContainer')
        .controls().touch()
        
var MY_SCORE = 0;
var MY_LIVES = 3;

// ## Player Sprite
Q.Sprite.extend("Player",{

  // the init constructor is called on creation
  init: function(p) {

    // You can call the parent's constructor with this._super(..)
    this._super(p, {
      sheet: "player",  // Setting a sprite sheet sets sprite width and height
      x: 410,           
      y: 90             
    });

    this.add('2d, platformerControls');
    
    this.on("hit.sprite",function(collision) {

      if(collision.obj.isA("Tower")) {
        Q.stageScene("nextLevel",1, { label: "Timmy fell down the well!" }); 
        this.destroy();
      }
    });

  }

});

// ## Tower Sprite
Q.Sprite.extend("Tower", {
  init: function(p) {
    this._super(p, { sheet: 'tower' });
  }
});

// ## Enemy Sprite
Q.Sprite.extend("Enemy",{
  init: function(p) {
    this._super(p, { sheet: 'enemy', vx: 100 });

    this.add('2d, aiBounce');

    // Listen for a sprite collision, if it's the player,
    // end the game unless the enemy is hit on top
    this.on("bump.left,bump.right,bump.bottom",function(collision) {
      if(collision.obj.isA("Player")) { 
      	if(MY_LIVES <= 0) {
      	Q.stageScene('hud', 3, { score: MY_SCORE, lives : MY_LIVES})
        Q.stageScene("endGame",1, { label: "Poor little Timmy died!" }); 
        collision.obj.destroy();
        }
        else { 
        	MY_LIVES =- 1;
        	Q.stageScene('hud', 3, { score: MY_SCORE, lives : MY_LIVES});
        }
      }
    });

    // If the enemy gets hit on the top, destroy it
    // and give the user a "hop"
    this.on("bump.top",function(collision) {
      if(collision.obj.isA("Player")) { 
        this.destroy();
        collision.obj.p.vy = -300;
        MY_SCORE += 10
       Q.stageScene('hud', 3, { score: MY_SCORE, lives : MY_LIVES});
      }
    });
  }
});

// ## Level1 scene
Q.scene("level1",function(stage) {

  // Add in a repeater for a little parallax action
  stage.insert(new Q.Repeater({ asset: "background-wall.png", speedX: 0.5, speedY: 0.5 }));

  // Add in a tile layer, and make it the collision layer
  stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level.json',
                             sheet:     'tiles' }));

  var player = stage.insert(new Q.Player());

  stage.add("viewport").follow(player);

  stage.insert(new Q.Tower({ x: 900, y: 209 }));
});

// ## Level2 scene
Q.scene("level2", function(stage) { 
	stage.insert(new Q.Repeater({ asset: "background-wall2.png", speedX: 0.5, speedY: 0.5 }))
	
	stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level.json',
                             sheet:     'tiles2' }));
    
    stage.insert(new Q.UI.Text({ 
      label: "Things are beginning to feel funny around here...",
      color: "white",
      x: 500,
      y: 309,
    }));
                             
    var player = stage.insert(new Q.Player());
    stage.add("viewport").follow(player);
    
    stage.insert(new Q.Enemy({ x: 300, y: 0 }));
    stage.insert(new Q.Enemy({ x: 500, y: 0 }));
    stage.insert(new Q.Enemy({ x: 700, y: 0 }));
  	
  	stage.insert(new Q.Tower({ x: 900, y: 209 }));
  	
});

// To display a game over / game won popup box, 
// create a endGame scene that takes in a `label` option
// to control the displayed message.
Q.scene('endGame',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));

  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Start Over?" }))         
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                   label: stage.options.label }));

  button.on("click",function() {
    Q.clearStages();
    Q.stageScene("hud", 3, {score: 0, lives : 3} );
    Q.stageScene('level1');
  });

  // Expand the container to visibily fit it's contents
  // (with a padding of 20 pixels)
  container.fit(20);
});

Q.scene('nextLevel', function(stage) { 
	var container = stage.insert(new Q.UI.Container({
    	x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  	}));

	var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Oh me oh my..." }))         
  	var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                   label: stage.options.label }));
                                                   
   button.on("click",function() {
   	 Q.clearStage(1);
   	 Q.stageScene("hud", 3, {score: MY_SCORE, lives : MY_LIVES});
  	 Q.stageScene("level2");
   });

  container.fit(20);
});

Q.scene('hud', function(stage) {
	var container = stage.insert(new Q.UI.Container({
		x : 100,
		y : 70
		}));
	var label = container.insert(new Q.UI.Text({x:50, y: -50,
    label: "Score: " + stage.options.score, color: "white" }));

   var strength = container.insert(new Q.UI.Text({x:250, y: -50,
   label: "Lives: " + stage.options.lives, color: "white" }));
    
    container.fit(20);
    
 });

// ## Asset Loading and Game Launch
// Q.load can be called at any time to load additional assets
// assets that are already loaded will be skipped
// The callback will be triggered when everything is loaded
Q.load("sprites.png, sprites.json, level.json, tiles.png, background-wall.png,  background-wall2.png, tiles2.png", function() {
  // Sprites sheets created manually
  Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
  Q.sheet("tiles2", "tiles2.png", { tilew: 32, tileh: 32 });

  //Sprite sheets from .json asset that define sprite locations
  Q.compileSheets("sprites.png","sprites.json");

  
  Q.stageScene("hud", 3, {score: 0, lives : 3} );
  Q.stageScene("level1");
});



});
