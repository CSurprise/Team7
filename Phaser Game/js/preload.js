// preloadState constructor

let preloadState = function(){

};

preloadState.prototype.preload = function(){

	//background sprites
	game.load.image("surgery", "assets/surgery.png");
	game.load.image("library", "assets/library.png");
	game.load.image("museum", "assets/museum.png");
	game.load.image("document", "assets/document.png");
	game.load.image("libraryFront", "assets/libraryFront.png");
	game.load.image("startMenu", "assets/start.png");

	//UI sprites
	game.load.image("inventory", "assets/inventory.png");
	game.load.image("locations", "assets/locations.png");
	game.load.image("surgeryIcon", "assets/surgeryIcon.png");
	game.load.image("libraryIcon", "assets/libraryIcon.png");
	game.load.image("museumIcon", "assets/museumIcon.png");
	game.load.image("docIcon", "assets/docIcon.png");
	game.load.image("closeX", "assets/closeX.png");
	game.load.image("rightArrow", "assets/rightArrow.png");
	game.load.image("leftArrow", "assets/leftArrow.png");
	game.load.image("mainStartButton", "assets/startBotton.png");

	//object sprites
	game.load.image("heart", "assets/heart.png");
	game.load.image("lungs", "assets/lungs.png");
	game.load.image("liver", "assets/liver.png");
	game.load.image("stomach", "assets/stomach.png");
	game.load.image("intestines", "assets/intestines.png")
	game.load.image("book1", "assets/book1.png");
	game.load.image("book2", "assets/book2.png");
	game.load.image("book3", "assets/book3.png");
	game.load.image("book4", "assets/book4.png");
	game.load.image("book5", "assets/book5.png");
	game.load.image("jar1", "assets/jar1.png");
	game.load.image("jar2", "assets/jar2.png");
	game.load.image("jar3", "assets/jar3.png");
	game.load.image("jar4", "assets/jar4.png");
	game.load.image("jar5", "assets/jar5.png");

	//spritesheets and jars
	game.load.spritesheet("booksheet", "assets/booksheet.png", 900, 1500);
	game.load.image("viewjar1", "assets/viewjar1.png");
	game.load.image("viewjar2", "assets/viewjar2.png");
	game.load.image("viewjar3", "assets/viewjar3.png");
	game.load.image("viewjar4", "assets/viewjar4.png");
	game.load.image("viewjar5", "assets/viewjar5.png");
	game.load.json("bookD", "assets/LevelData/bookData.json");
	game.load.json("jarD", "assets/LevelData/jarText.json");

	game.load.image("gradeF", "assets/Fail.png");
	game.load.image("gradeC", "assets/Cgrade.png");
	game.load.image("gradeB", "assets/Bgrade.png");
	game.load.image("gradeA", "assets/Agrade.png");
};

preloadState.prototype.create = function(){
	game.state.start("Menu");
	
};

preloadState.prototype.update = function(){
	
};