window.addEventListener('load', function() {
	var Q = Quintus({				//new engine instance
		development: true			//assets won't be cached 
							   //turn off for proudction
  })

  .include("Sprites, Scenes, Input, 2D")		//loading modules
  .setup("gameContainer")				//use existing canvas element
  .controls()						//default controls


  //game code goes here

  Q.scene("demo", function(stage) { 
	 var timmy1 = new Q.Sprite({x: 400, y: 100, asset: 'timmy1.png', angle: 0, collisionMark: 1, scale: 1});
	
	timmy1.p.points = [
		[-150, -120],
		[  150, -120 ],
    		[  150,   60 ],
      		[   90,  120 ],
      		[  -90,  120 ],
      		[ -150,   60 ]
        ];

  stage.insert(timmy1);
  timmy1.add('2d')			//Add 2D component for collision & gravity
  timmy1.on('step', function() {

  });

 var sprite2 = new Q.Sprite({ x: 400, y: 600, w: 300, h: 200 });
    sprite2.draw= function(ctx) {
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    };
    stage.insert(sprite2);

  Q.input.on('up',stage,function(e) { 
      timmy1.p.scale -= 0.1;
    });

    Q.input.on('down',stage,function(e) { 
      timmy1.p.scale += 0.1;
    });

    Q.input.on('left',stage,function(e) {
      timmy1.p.angle -= 5;
    });

    Q.input.on('right',stage,function(e) {
      timmy1.p.angle += 5;
    });

    Q.input.on('fire',stage,function(e) {
      timmy1.p.vy = -600;
    });

    Q.input.on('action',stage,function(e) {
      timmy1.p.x = 400;
      timmy1.p.y = 100;
    });
  });


  Q.load('timmy1.png', function() {
	
	Q.stageScene("demo");


	Q.debug = true;

	Q.input.keyboardControls();
  });

});
