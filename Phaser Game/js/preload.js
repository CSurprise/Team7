// preloadState constructor

let preloadState = function(){

};

preloadState.prototype.preload = function(){

	//background sprites
	game.load.image("surgery", "assets/surgery.png");
	game.load.image("library", "assets/library.png");
	game.load.image("museum", "assets/museum.png");
	game.load.image("document", "assets/document.png");

	//UI sprites
	game.load.image("inventory", "assets/inventory.png");
	game.load.image("locations", "assets/locations.png");
	game.load.image("surgeryIcon", "assets/surgeryIcon.png");
	game.load.image("libraryIcon", "assets/libraryIcon.png");
	game.load.image("museumIcon", "assets/museumIcon.png");
	game.load.image("docIcon", "assets/docIcon.png");
	game.load.image("star", "assets/star.png");
	game.load.image("rightArrow", "assets/rightArrow.png");

	//object sprites
	game.load.image("heart", "assets/heart.png");
	game.load.image("lungs", "assets/lungs.png");
	game.load.image("liver", "assets/liver.png");
	game.load.image("stomach", "assets/stomach.png");
	game.load.image("book1", "assets/book1.png");
	game.load.image("book2", "assets/book2.png");
	game.load.image("book3", "assets/book3.png");
	game.load.image("book4", "assets/book4.png");

	//spritesheets
	game.load.spritesheet("book1sheet", "assets/book1sheet.png", 32, 48);
};

preloadState.prototype.create = function(){
	game.state.start("Game");
	
};

preloadState.prototype.update = function(){
	
};