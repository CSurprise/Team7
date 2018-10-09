// preloadState constructor

let preloadState = function(){

};

preloadState.prototype.preload = function(){
	game.load.image("surgery", "assets/surgery.png");
	game.load.image("library", "assets/library.png");
	game.load.image("museum", "assets/museum.png");

	game.load.image("inventory", "assets/inventory.png");
	game.load.image("locations", "assets/locations.png");
	game.load.image("star1", "assets/star1.png");
	game.load.image("star2", "assets/star2.png");
	game.load.image("star3", "assets/star3.png");

	game.load.image("heart", "assets/heart.png");
	game.load.image("lungs", "assets/lungs.png");
	game.load.image("liver", "assets/liver.png");
	game.load.image("stomach", "assets/stomach.png");
	game.load.image("book", "assets/book.png");
};

preloadState.prototype.create = function(){
	game.state.start("Game");
	
};

preloadState.prototype.update = function(){
	
};