// gameplayState constructor

let gameplayState = function(){
	
};

gameplayState.prototype.create = function(){
	
	//important variables
	this.location = null; //current location
	this.inventorySize = 0; //number of objects in inventory
	this.reading = "none"; //what are we reading

	//add UI sprites and backgrounds
	this.surgery = game.add.sprite(0,0,"surgery");
	this.library = game.add.sprite(0,0,"library");
	this.museum = game.add.sprite(0,0,"museum");
	this.document = game.add.sprite(100, 500, "document");
	this.locations = game.add.sprite(0, 0, "locations");
	this.inventory = game.add.sprite(0, game.world.height - 200, "inventory");
	this.surgeryIcon = game.add.sprite(100, 100, "surgeryIcon");
	this.libraryIcon = game.add.sprite(300, 100, "libraryIcon");
	this.museumIcon = game.add.sprite(500, 100, "museumIcon");
	this.docIcon = game.add.sprite(900, 100, "docIcon");

	//add surgery objects
	this.surgeryObjects = [];
	this.surgeryObjects.push(game.add.sprite(400,700,"heart"));
	this.surgeryObjects.push(game.add.sprite(400,900,"lungs"));
	this.surgeryObjects.push(game.add.sprite(400,1300,"liver"));
	this.surgeryObjects.push(game.add.sprite(400,1500,"stomach"));

	//add library objects
	this.libraryObjects = [];
	this.libraryObjects.push(game.add.sprite(300,500,"book1"));
	this.libraryObjects.push(game.add.sprite(300,800,"book2"));
	this.libraryObjects.push(game.add.sprite(300,1100,"book3"));
	this.libraryObjects.push(game.add.sprite(300,1400,"book4"));
	this.library

	//add museum objects
	this.museumObjects = [];

	//allow input for buttons
	this.surgeryIcon.inputEnabled = true;
	this.surgeryIcon.events.onInputDown.add(this.surgeryIconTap, this);
	this.libraryIcon.inputEnabled = true;
	this.libraryIcon.events.onInputDown.add(this.libraryIconTap, this);
	this.museumIcon.inputEnabled = true;
	this.museumIcon.events.onInputDown.add(this.museumIconTap, this);
	this.docIcon.inputEnabled = true;
	this.docIcon.events.onInputUp.add(this.docIconTap, this);

	//allow input for surgeryObjects
	for (var i = 0; i < this.surgeryObjects.length; i++){
		this.surgeryObjects[i].inventory = false;
		this.surgeryObjects[i].inputEnabled = true; //TODO: remove this
		this.surgeryObjects[i].input.enableDrag(true); //TODO: remove this
		this.surgeryObjects[i].events.onInputUp.add(this.addToInventory, this);
	}

	game.world.bringToTop(this.document);
	this.document.visible = false;
	this.loadSurgery();
};

gameplayState.prototype.update = function(){

};

//switches to the surgery location
gameplayState.prototype.loadSurgery = function(){
	this.location = "surgery";
	this.surgery.visible = true;
	this.library.visible = false;
	this.museum.visible = false;
	for (var i = 0; i < this.surgeryObjects.length; i++){
		this.surgeryObjects[i].visible = true;
	}
	for (var i = 0; i < this.libraryObjects.length; i++){
		this.libraryObjects[i].visible = false;
	}
	for (var i = 0; i < this.museumObjects.length; i++){
		this.musuemObjects[i].visible = false;
	}
}

//switches to the library location
gameplayState.prototype.loadLibrary = function(){
	this.location = "library";
	this.surgery.visible = false;
	this.library.visible = true;
	this.museum.visible = false;
	for (var i = 0; i < this.surgeryObjects.length; i++){
		if (this.surgeryObjects[i].inventory == false){ //allow inventory to stay visible
			this.surgeryObjects[i].visible = false;
		}
	}
	for (var i = 0; i < this.libraryObjects.length; i++){
		this.libraryObjects[i].visible = true;
	}
	for (var i = 0; i < this.museumObjects.length; i++){
		this.museumObjects[i].visible = false;
	}
}

//switches to the museum location
gameplayState.prototype.loadMuseum = function(){
	this.location = "museum";
	this.surgery.visible = false;
	this.library.visible = false;
	this.museum.visible = true;
	for (var i = 0; i < this.surgeryObjects.length; i++){
		if (this.surgeryObjects[i].inventory == false){ //allow inventory to stay visible
			this.surgeryObjects[i].visible = false;
		}
	}
	for (var i = 0; i < this.libraryObjects.length; i++){
		this.libraryObjects[i].visible = false;
	}
	for (var i = 0; i < this.musuemObjects.length; i++){
		this.museumObjects[i].visible = true;
	}
}

//button functions
gameplayState.prototype.surgeryIconTap = function(){
	if (this.reading == "none") { this.loadSurgery(); }
}
gameplayState.prototype.libraryIconTap = function(){
	if (this.reading == "none") { this.loadLibrary(); }
}
gameplayState.prototype.museumIconTap = function(){
	if (this.reading == "none") { this.loadMuseum(); }
}
gameplayState.prototype.docIconTap = function(){
	if (this.reading == "none") {
		this.document.visible = true;
		this.reading = "document";
	}
	else if (this.reading == "document") {
		this.document.visible = false;
		this.reading = "none";
	}
}

//adds a surgeryObject to inventory
gameplayState.prototype.addToInventory = function(sprite, pointer){
	if (sprite.y > 1900){ //is sprite close to inventory?
		if (sprite.inventory == false){ //is it already in inventory?
			sprite.inventory = true;
			this.inventorySize++;
			sprite.scale.set(.4,.4);
			sprite.x = this.inventorySize*300 - 200;
			sprite.y = 2250;
			sprite.input.draggable = false;
		}
	}
}

