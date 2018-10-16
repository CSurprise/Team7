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
	game.load.image("submit", "assets/submit.png");

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
	game.load.image("jar6", "assets/jar6.png");
	game.load.image("jar7", "assets/jar7.png");


	//zoom in sprites
	game.load.spritesheet("booksheet", "assets/booksheet.png", 900, 1500);
	game.load.image("heartSick", "assets/SickHeartZoom1.png");
	game.load.image("lungsSick", "assets/SickLungsZoom.png");
	game.load.image("liverSick", "assets/SickLiverZoom.png");
	game.load.image("stomachSick", "assets/SickStomachZoom.png");
	game.load.image("intestinesSick", "assets/SickIntestinesZoom1.png");

	//jarview sprites
	game.load.image("viewjar11", "assets/viewjar1HealthyHeart.png");
	game.load.image("viewjar12", "assets/viewjar1SickHeart.png");
	game.load.image("viewjar13", "assets/viewjar1SickHeart1.png");
	game.load.image("viewjar21", "assets/viewjar2HealthyLungs.png");
	game.load.image("viewjar22", "assets/viewjar2SickLungs.png");
	game.load.image("viewjar23", "assets/viewjar2SickLungs1.png");
	game.load.image("viewjar24", "assets/viewjar2SickLungs2.png");
	game.load.image("viewjar31", "assets/viewjar3HealthyLiver.png");
	game.load.image("viewjar32", "assets/viewjar3SickLiver.png");
	game.load.image("viewjar33", "assets/viewjar3SickLiver1.png");
	game.load.image("viewjar41", "assets/viewjar4HealthyStomach.png");
	game.load.image("viewjar42", "assets/viewjar4SickStomach.png");
	game.load.image("viewjar43", "assets/viewjar4SickStomach1.png");
	game.load.image("viewjar44", "assets/viewjar4SickStomach2.png");
	game.load.image("viewjar51", "assets/viewjar5HealthyIntestines.png");
	game.load.image("viewjar52", "assets/viewjar5SickIntestines.png");
	game.load.image("viewjar53", "assets/viewjar5SickIntestines1.png");
	game.load.image("viewjar1", "assets/viewjar1.png");
	game.load.image("viewjar3", "assets/viewjar3.png");
	game.load.image("viewjar5", "assets/viewjar5.png");

	//json data
	game.load.json("bookD", "assets/LevelData/bookData.json");
	game.load.json("jarD", "assets/LevelData/jarText.json");

	game.load.image("gradeF", "assets/Fail.png");
	game.load.image("gradeC", "assets/Cgrade.png");
	game.load.image("gradeB", "assets/Bgrade.png");
	game.load.image("gradeA", "assets/Agrade.png");

	game.load.image("overlay", "assets/dark_overlay.png");
	game.load.image("menuButton", "assets/mainmenu.png");
	game.load.image("whiteLine", "assets/whiteLine.png");

	game.load.audio("Background Music", "assets/Music/BackMu.mp4");
	game.load.audio("SelectSound", "assets/Music/select.wav");
	game.load.audio("JarSelect", "assets/Music/clink.wav");
	game.load.audio("BookSelect", "assets/Music/bookPoof.wav");
	game.load.audio("PageTurn", "assets/Music/pageTurn.mp3");
	game.load.audio("Cut", "assets/Music/cut.wav");
	game.load.audio("gradePop", "assets/Music/gradePop.wav");
};

preloadState.prototype.create = function(){
	this.backgroundMusic = game.add.audio("Background Music", 1, true);
	this.backgroundMusic.play();
	game.state.start("Menu");
	
};

preloadState.prototype.update = function(){
	
};