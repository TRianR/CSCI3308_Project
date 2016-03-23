window.addEventListener('load', function() {
	var Q = Quintus({				//new engine instance
		development: true			//assets won't be cached 
							   //turn off for proudction
  })

  .include("Sprites, Scenes, Input, 2D")			//loading modules
  .setup("gameContainer")					//use existing canvas element
  .controls()						//default controls


  //game code goes here


});
