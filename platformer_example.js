// # Timmy's Lost Dimension Platformer with Quintus Engine
//
// [Run the example](../quintus/examples/platformer/index.html)
// WARNING: this game must be run from a non-file:// url
// as it loads a level json file.

window.addEventListener("load",function() {

// Set up an instance of the Quintus engine  and include
// the Sprites, Scenes, Input and 2D module
var Q = window.Q = Quintus({audioSupported: [ 'wav','mp3','ogg' ]})
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, Audio")
        .setup('quintusContainer')
        .controls().touch()
        .enableSound();
        
var MY_SCORE = 0;
var MY_LIVES = 3;
var MY_LEVEL = 1; 
var level5_red = 0;
var level5_blue = 0; 

// ## Player Sprite
Q.Sprite.extend("Player",{

  // the init constructor is called on creation
  init: function(p) {

    // You can call the parent's constructor with this._super(..)
    this._super(p, {
      //sprite "player_anim",
      sheet: "player_anim", // Setting a sprite sheet sets sprite width and height
 	  x: 410,           
      y: 90             
    });

    this.add('2d, platformerControls, animation');
    this.on('walk');
    this.on('jump');
    
    this.on("hit.sprite",function(collision) {

      if(collision.obj.isA("Tower")) {
		// Timmy going down well sound -> 'well.mp3/.wav/.ogg'
		Q.audio.play('well.mp3');
       Q.stageScene("stageNextLevel", 1, {buttontext : "Oh me oh my", label: "Timmy fell down the well!" }); 
        this.destroy();
      }
      else if(collision.obj.isA("Ufo")) {
	    // Timmy going down well sound -> 'well.mp3/.wav/.ogg'
		Q.audio.play('well.mp3');
       Q.stageScene("stageNextLevel", 1, {buttontext : "Mom...MOM!!!", label: "Where to now?" }); 
        this.destroy();
      }
       else if(collision.obj.isA("Portal")) {
	    // Timmy going down well sound -> 'well.mp3/.wav/.ogg'
		Q.audio.play('well.mp3'); 
        Q.stageScene("stageNextLevel", 1, {buttontext : "Huzzah!", label: "On the the next dimension!!" }); 
        this.destroy();
      }
      else if(collision.obj.isA("Door")) {
	    // Timmy going down well sound -> 'well.mp3/.wav/.ogg'
		Q.audio.play('well.mp3');
		Q.stageScene("stageNextLevel", 1, {buttontext : "Huweeee", label: "It just keeps going!" });  
        this.destroy();
      }
	  else if(collision.obj.isA("riceball")) {
	    // Timmy going down well sound -> 'well.mp3/.wav/.ogg'
		Q.audio.play('well.mp3');
		Q.stageScene("stageNextLevel", 1, {buttontext : "I think I have a stomach ache!", label: "Yummy" });  
        this.destroy();
      }
      else if(collision.obj.isA("green_Psyche")) {
	    // Timmy going down well sound -> 'well.mp3/.wav/.ogg'
		Q.audio.play('well.mp3');
		Q.stageScene("stageNextLevel", 1, {buttontext : "Blaaaah", label: "When will it be over??" });  
        this.destroy();
      }
      else if(collision.obj.isA("red_Psyche")) {
			this.p.x = 870;
			this.p.y = 80;
		}
    });
  },
  
  walk: function(dt) {
    	if(this.p.vx != 0) { 
    		this.play("walk");
    	} else {
    		this.play("stand"); 
    	}
  	},
  	
  jump: function(dt) {
  	if(this.p.vy != 0) {
   		this.play("jump");
  	}
  }

});

// ## Tower Sprite
Q.Sprite.extend("Tower", {
  init: function(p) {
    this._super(p, { sheet: 'tower' });
  }
});

// ## Portal Sprite
Q.Sprite.extend("Portal", {
  init: function(p) {
    this._super(p, { sheet: 'portal' });
    asset: "portal.png";
  }
});

// ## Ufo sprite
Q.Sprite.extend("Ufo", {
  init: function(p) {
    this._super(p, { sheet: 'ufo' });
    asset: "ufo.png";
  }
});
// ## Door sprite
Q.Sprite.extend("Door", {
  init: function(p) {
    this._super(p, { sheet: 'door' });
    asset: "door.png";
  }
});
// ## riceball sprite
Q.Sprite.extend("riceball", {
  init: function(p) {
    this._super(p, { sheet: 'riceball' });
    asset: "riceball.png";
  }
});

Q.Sprite.extend("blue_Psyche", {
	init: function(p) {
    this._super(p, { sheet: 'bluePsyche' });
  }
});

Q.Sprite.extend("green_Psyche", {
	init: function(p) {
    this._super(p, { sheet: 'greenPsyche' });
  }
});

Q.Sprite.extend("red_Psyche", {
	init: function(p) {
    this._super(p, { sheet: 'redPsyche' });
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
		  // Play hurt audio
		  Q.audio.play('Hit_Hurt.mp3');
      	if(MY_LIVES <= 0) {
		// Stops music and all sounds upon game ending
		Q.audio.stop();
			
      	Q.stageScene('hud', 3, { score: MY_SCORE, lives : MY_LIVES})
        Q.stageScene("endGame",1, { label: "Poor little Timmy died!" }); 
        collision.obj.destroy();
        }
        else { 
        	MY_LIVES -= 1;
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
        
        // play jump audio when landing ontop of enemy
        Q.audio.play('Jump.mp3');
        
       Q.stageScene('hud', 3, { score: MY_SCORE, lives : MY_LIVES});
      }
    });
  }
});
// ## Fire Sprite
Q.Sprite.extend("Fire",{
  init: function(p) {
    this._super(p, { sheet: 'fire', vx: 100 });

    this.add('2d, aiBounce');

    // Listen for a sprite collision, if it's the player,
    // end the game unless the enemy is hit on top
    this.on("bump.left,bump.right,bump.bottom",function(collision) {
      if(collision.obj.isA("Player")) { 
		  // Play hurt audio
		  Q.audio.play('Hit_Hurt.mp3');
      	if(MY_LIVES <= 0) {
		// Stops music and all sounds upon game ending
		Q.audio.stop();
			
      	Q.stageScene('hud', 3, { score: MY_SCORE, lives : MY_LIVES})
        Q.stageScene("endGame",1, { label: "Poor little Timmy died!" }); 
        collision.obj.destroy();
        }
        else { 
        	MY_LIVES -= 1;
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
        
        // play jump audio when landing ontop of enemy
        Q.audio.play('Jump.mp3');
        
       Q.stageScene('hud', 3, { score: MY_SCORE, lives : MY_LIVES});
      }
    });
  }
});
//Adding alien sprites to level
Q.Sprite.extend("Alien", {
  init: function(p) {
    this._super(p, { sheet: 'alien', vx: 100 });
    this.add("2d, aiBounce");
      asset: "alien.png"
      
      // Listen for a sprite collision, if it's the player,
    // end the game unless the enemy is hit on top
    this.on("bump.left,bump.right,bump.bottom",function(collision) {
      if(collision.obj.isA("Player")) { 
		  // Play hurt audio
		  Q.audio.play('Hit_Hurt.mp3');
      	if(MY_LIVES <= 0) {
		// Stops music and all sounds upon game ending
		Q.audio.stop();
			
      	Q.stageScene('hud', 3, { score: MY_SCORE, lives : MY_LIVES})
      	MY_LEVEL = 1;
        Q.stageScene("endGame",1, { label: "Poor little Timmy died!" }); 
        collision.obj.destroy();
        }
        else { 
        	MY_LIVES -= 1;
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
        
        // play jump audio when landing ontop of enemy
        Q.audio.play('Jump.mp3');
        
       Q.stageScene('hud', 3, { score: MY_SCORE, lives : MY_LIVES});
      }
    });
    
    }  
 });
 
 Q.Sprite.extend("drumstick", {
 	init: function(p) {
 		this._super(p, { sheet : "drumstick" }); 
 		
 		this.add("2d");
 	this.on("bump.top, bump.left,bump.right,bump.bottom",function(collision) {
      if(collision.obj.isA("Player")) { 
        this.destroy();
        //collision.obj.p.vy = -300;
        MY_SCORE += 10
        
        // play jump audio when landing ontop of enemy
        Q.audio.play('bite.wav');
        
       Q.stageScene('hud', 3, { score: MY_SCORE, lives : MY_LIVES});
      }	 
    });
 	
 	}
 });
 		
// ## Level1 scene
Q.scene("level1",function(stage) {

  // Add in a repeater for a little parallax action
  stage.insert(new Q.Repeater({ asset: "background-wall.png", speedX: 0.5, speedY: 0.5 }));
  // start music
	Q.audio.play('Music.mp3',{ loop: true });
  // Add in a tile layer, and make it the collision layer
  stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level.json',
                             sheet:     'tiles' }));

  var player = stage.insert(new Q.Player());
  
  stage.add("viewport").follow(player);
 
  stage.insert(new Q.Tower({ x: 900, y: 209 }));
  stage.insert(new Q.drumstick( { x: 870, y: 90}));
  
});

// ## Level2 scene
Q.scene("level2", function(stage) { 
	stage.insert(new Q.Repeater({ asset: "background-wall2.png", speedX: 0.5, speedY: 0.5 }))
	
	stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level2.json',
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
  	
  	stage.insert(new Q.Ufo({ x: 900, y: 209 }));
  
  	
});

// ## Level3 scene
Q.scene("level3", function(stage) { 
	stage.insert(new Q.Repeater({ asset: "background-wall3.png", speedX: 0.5, speedY: 0.5 }))
	
	stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level3.json',
                             sheet:     'tiles3' }));
    
    stage.insert(new Q.UI.Text({ 
      label: "This doesn't look like Kansas anymore...",
      color: "white",
      x: 500,
      y: 309,
    }));
                             
    var player = stage.insert(new Q.Player()); 
    
    stage.add("viewport").follow(player);
    
  stage.insert(new Q.Alien({ x: 300, y: 0 }));
  stage.insert(new Q.Alien({ x: 600, y: 0 }));
  stage.insert(new Q.Alien({ x: 700, y: 0 }));
  	
  	stage.insert(new Q.Portal({ x: 1000, y: 209 }));
  	
  	
});

// ## Level4 scene
Q.scene("level4",function(stage) {

  // Add in a repeater for a little parallax action
  stage.insert(new Q.Repeater({ asset: "background-wall4.png", speedX: 0.5, speedY: 0.5 }));

  // Add in a tile layer, and make it the collision layer
  stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level4.json',
                             sheet:     'tiles4' }));

  var player = stage.insert(new Q.Player());
  
 stage.add("viewport").follow(player);
 stage.insert(new Q.Fire({ x: 250, y: 200 }));
 stage.insert(new Q.Fire({ x: 200, y: 0 }));
 stage.insert(new Q.Fire({ x: 350, y: 0 }));
 stage.insert(new Q.Fire({ x: 400, y: 0 }));
 stage.insert(new Q.Fire({ x: 550, y: 0 }));
 stage.insert(new Q.Fire({ x: 600, y: 0 }));
 stage.insert(new Q.Fire({ x: 1200, y: 100}));
 stage.insert(new Q.Door({ x: 32, y: 43}));
//  stage.insert(new Q.drumstick( { x: 875, y: 209}));
  
});


// Level 5 
// Developed by Meri 
// Psychedelic theme -- puzzle based 
Q.scene("level5", function(stage) { 
	stage.insert(new Q.Repeater( { asset: "background-wall5.png", speedX: 0.5, speedY: 0.5})); 
	
	stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level5.json',
                             sheet:     'tiles5' }));
	
	var player = stage.insert(new Q.Player());
	
	stage.add("viewport").follow(player);
	
	//Test collectable
	stage.insert(new Q.drumstick( { x: 875, y: 80}));
	
	//Section 1 
	stage.insert(new Q.red_Psyche({ x: 130, y: 173}));
	stage.insert(new Q.blue_Psyche({ x: 1600, y: 173}));
	
	
	player.on("hit.sprite",function(collision) {
		if(collision.obj.isA("red_Psyche")) {
			player.x = 870;
			player.y = 80;
		}
	});
	
	stage.insert(new Q.blue_Psyche({ x: 350, y: 300}));
	stage.insert(new Q.blue_Psyche({ x: 870, y: 300}));
	stage.insert(new Q.blue_Psyche({ x: 1070, y: 300}));
	stage.insert(new Q.blue_Psyche({ x: 770, y: 500}));
	// To do: 
	//        insert portals 
	// 		  connect portals
	// 		  include collectables
	
}); 

// ## Level7 scene developed by Jessica Evans
Q.scene("level7",function(stage) {

  // Add in a repeater for a little parallax action
  stage.insert(new Q.Repeater({ asset: "background-wall6.png", speedX: 0.5, speedY: 0.5 }));

  // Add in a tile layer, and make it the collision layer
  stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level7.json',
                             sheet:     'tiles2' }));

  var player = stage.insert(new Q.Player());
  
  stage.add("viewport").follow(player);

  stage.insert(new Q.drumstick( { x: 200, y: 20}));
  stage.insert(new Q.drumstick( { x: 190, y: 20}));
  stage.insert(new Q.drumstick( { x: 180, y: 20}));
  stage.insert(new Q.drumstick( { x: 300, y: 300}));
  stage.insert(new Q.drumstick( { x: 290, y: 300}));
  stage.insert(new Q.drumstick( { x: 280, y: 300}));
  stage.insert(new Q.drumstick( { x: 270, y: 300}));
  stage.insert(new Q.drumstick( { x: 260, y: 300}));
  stage.insert(new Q.drumstick( { x: 250, y: 300}));
  stage.insert(new Q.drumstick( { x: 240, y: 300}));
  stage.insert(new Q.drumstick( { x: 230, y: 300}));
  stage.insert(new Q.drumstick( { x: 220, y: 300}));
  stage.insert(new Q.drumstick( { x: 210, y: 300}));
  stage.insert(new Q.drumstick( { x: 200, y: 300}));
  stage.insert(new Q.Enemy({ x: 550, y: 250 }));

  stage.insert(new Q.riceball({ x: 62, y: 43}));
  
});

// ## Level8 scene developed by Jessica Evans
Q.scene("level8",function(stage) {

  // Add in a repeater for a little parallax action
  stage.insert(new Q.Repeater({ asset: "background-wall7.png", speedX: 0.5, speedY: 0.5 }));

  // Add in a tile layer, and make it the collision layer
  stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level8.json',
                             sheet:     'tiles6' }));

  var player = stage.insert(new Q.Player());
  
  stage.add("viewport").follow(player);
  
  stage.insert(new Q.Door({ x: 35, y: 365}));
  stage.insert(new Q.drumstick( { x: 50, y: 350}));
  stage.insert(new Q.drumstick( { x: 60, y: 350}));
  stage.insert(new Q.drumstick( { x: 70, y: 350}));
  stage.insert(new Q.drumstick( { x: 80, y: 350}));
   stage.insert(new Q.drumstick( { x: 80, y: 250}));
   stage.insert(new Q.Enemy({ x: 150, y: 250 }));
   stage.insert(new Q.Enemy({ x: 250, y: 250 }));
   stage.insert(new Q.Enemy({ x: 350, y: 250 }));
    stage.insert(new Q.drumstick( { x: 80, y: 150}));
  
 
});

// ## Level9 scene developed by Jessica Evans
Q.scene("level9",function(stage) {

  // Add in a repeater for a little parallax action
  stage.insert(new Q.Repeater({ asset: "background-wall4.png", speedX: 0.5, speedY: 0.5 }));

  // Add in a tile layer, and make it the collision layer
  stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level9.json',
                             sheet:     'tiles4' }));

  var player = stage.insert(new Q.Player());
  
  stage.add("viewport").follow(player);
  stage.insert(new Q.Door({ x: 560, y: 135}));
  stage.insert(new Q.drumstick({ x: 35, y: 365}));
  stage.insert(new Q.drumstick({ x: 55, y: 365}));
  stage.insert(new Q.drumstick({ x: 75, y: 365}));
  stage.insert(new Q.drumstick({ x: 95, y: 365}));
  stage.insert(new Q.drumstick({ x: 105, y: 365}));
  stage.insert(new Q.drumstick({ x: 125, y: 365}));
  stage.insert(new Q.drumstick({ x: 145, y: 365}));
  stage.insert(new Q.drumstick({ x: 155, y: 365}));
  stage.insert(new Q.drumstick({ x: 170, y: 365}));
  stage.insert(new Q.Enemy({ x: 300, y: 365 }));
  stage.insert(new Q.Enemy({ x: 400, y: 365 }));
});


// To display a game over / game won popup box, 
// create a endGame scene that takes in a `label` option
// to control the displayed message.
Q.scene('endGame',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));
  
	// Play sound for when Timmy dies -> 'death.mp3/.wav/.ogg'
	Q.audio.play('death.mp3');

  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Start Over?" }))         
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                   label: stage.options.label }));

  button.on("click",function() {
    Q.clearStages();
    MY_LIVES = 3;
    MY_SCORE = 0;
    Q.stageScene("hud", 3, {score: MY_SCORE, lives : MY_LIVES} );
    Q.stageScene("mute", 4);
    Q.stageScene('level1');
  });

  // Expand the container to visibily fit it's contents
  // (with a padding of 20 pixels)
  container.fit(20);
});
Q.scene('stageFirstLevel', function(stage) { 
	var container = stage.insert(new Q.UI.Container({
    	x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  	}));

	var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Here we go again..." }))         
  	var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                   label: stage.options.label }));
                                                   
   button.on("click",function() {
   	 Q.clearStage(1);
   	 Q.stageScene("hud", 3, {score: MY_SCORE, lives : MY_LIVES});
  	 Q.stageScene("level1");
   });

  container.fit(20);
});

Q.scene('stageNextLevel', function(stage) { 
	MY_LEVEL += 1;  
	 
	var container = stage.insert(new Q.UI.Container({
    	x: Q.width/2, y: Q.height/2, fill: "rgba(255,255,255,0.75)"
  	}));
  	
  	var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: stage.options.buttontext }))         
  	var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                   label: stage.options.label }));
                                             
    button.on("click",function() {
   	 Q.clearStage(1);
   	 Q.stageScene("hud", 3, {score: MY_SCORE, lives : MY_LIVES});
   	 
   	 if (MY_LEVEL == 2){
  	 Q.stageScene("level2");
  	 }
  	 if (MY_LEVEL == 3){
  	 Q.stageScene("level3");
  	 }
  	 if (MY_LEVEL == 4){
  	 Q.stageScene("level4");
  	 }
  	 if (MY_LEVEL == 5){
  	 Q.stageScene("level5");
  	 }
	 if (MY_LEVEL == 6){
  	 Q.stageScene("level6");
  	 }
	 if (MY_LEVEL == 7){
  	 Q.stageScene("level7");
  	 }
	 if (MY_LEVEL == 8){
  	 Q.stageScene("level8");
  	 }
	 if (MY_LEVEL == 9){
  	 Q.stageScene("level9");
  	 }
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


Q.scene('mute', function(stage) {
   var container = stage.insert(new Q.UI.Container({
		x : 50,
		y : 470
		}));
	
   var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Mute" })) 
    
   button.on("click",function() {
   	Q.audio.stop();
   });
   
    container.fit(20);
    
 });
 

// ## Asset Loading and Game Launch
// Q.load can be called at any time to load additional assets
// assets that are already loaded will be skipped
// The callback will be triggered when everything is loaded
Q.load("level.json, level2.json, level3.json, level4.json, level5.json, level7.json, level8.json, level9.json, sprites.json, door.json, alien.json, riceball.json, collectables.json, ufo.json, fire.json, timmyanim.json, psyches.json, background-wall.png, background-wall2.png, background-wall3.png, background-wall4.png, background-wall5.png, background-wall6.png, background-wall7.png, tiles.png, tiles2.png, tiles3.png, tiles4.png, tiles5.png, tiles6.png, alien.png, portal.png, portal.json, timmyanim.png, fire.png, ufo.png, door.png, sprites.png, riceball.png, collectables.png, psyches.png, bite.wav, Hit_Hurt.mp3, Jump.mp3, Music.mp3, well.mp3, death.mp3 ", function() {
  // Sprites sheets created manually
  Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
  Q.sheet("tiles2", "tiles2.png", { tilew: 32, tileh: 32 });
  Q.sheet("tiles3", "tiles3.png", { tilew: 32, tileh: 32 });
  Q.sheet("tiles4", "tiles4.png", { tilew: 32, tileh: 32});
  Q.sheet("tiles5", "tiles5.png", { tilew: 32, tileh: 32});
  Q.sheet("tiles6", "tiles6.png", { tilew: 32, tileh: 32});
  
  
  //Sprite sheets from .json asset that define sprite locations
  Q.compileSheets("sprites.png","sprites.json");
  Q.compileSheets("alien.png","alien.json");
  Q.compileSheets("door.png","door.json");
  Q.compileSheets("riceball.png","riceball.json")
  Q.compileSheets("ufo.png", "ufo.json");
  Q.compileSheets("fire.png","fire.json");
  Q.compileSheets("portal.png","portal.json");
  Q.compileSheets("collectables.png", "collectables.json");
  Q.compileSheets("timmyanim.png", "timmyanim.json");
  Q.compileSheets("psyches.png", "psyches.json");
  
  Q.animations("Player", {
  	walk: { frames:[1, 2], rate: 1/15, loop: true},
  	stand: {frames: [0], rate: 1/10},
  	jump: { frames: [3], rate: 1/10},
  	hurt: { frames: [4], rate: 1/10, loop: false }
  });
  //var alien = new Q.Alien(); 
  //Q.gameLoop(function(dt) {
    //Q.clear();
    //alien.update(dt);
    //alien.render(Q.ctx);
  //});
  
  Q.stageScene("hud", 3, {score: 0, lives : 3} );
  Q.stageScene("mute", 4);
  Q.stageScene("level1");
});



});
