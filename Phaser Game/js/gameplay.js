// gameplayState constructor

let gameplayState = function(){
	
};

gameplayState.prototype.create = function(){
	
	//important variables
	this.location = null; //current location
	this.inventorySize = 0; //number of objects in inventory
	this.reading = "none"; //what are we reading

	//background and UI sprites
	this.surgery = game.add.sprite(0,0,"surgery");
	this.library = game.add.sprite(0,0,"library");
	this.museum = game.add.sprite(0,0,"museum");
	this.locations = game.add.sprite(0, 0, "locations");
	this.inventory = game.add.sprite(0, game.world.height - 200, "inventory");
	this.surgeryIcon = game.add.sprite(100, 100, "surgeryIcon");
	this.libraryIcon = game.add.sprite(300, 100, "libraryIcon");
	this.museumIcon = game.add.sprite(500, 100, "museumIcon");
	this.docIcon = game.add.sprite(900, 100, "docIcon");

	//windows sprites
	this.document = game.add.sprite(100, 500, "document");
	this.star = game.add.sprite(900,700,"star"); this.star.scale.set(3,3);
	this.book1sheet = game.add.sprite(100, 500, "book1sheet"); this.book1sheet.scale.set(30,30);
	this.windowSprites = [];
	this.windowSprites.push(this.document);
	this.windowSprites.push(this.star);
	this.windowSprites.push(this.book1sheet);

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

	//add museum objects
	this.museumObjects = [];

	//allow input for buttons
	this.surgeryIcon.inputEnabled = true;
	this.surgeryIcon.events.onInputUp.add(this.surgeryIconTap, this);
	this.libraryIcon.inputEnabled = true;
	this.libraryIcon.events.onInputUp.add(this.libraryIconTap, this);
	this.museumIcon.inputEnabled = true;
	this.museumIcon.events.onInputUp.add(this.museumIconTap, this);
	this.docIcon.inputEnabled = true;
	this.docIcon.events.onInputUp.add(this.docIconTap, this);
	this.star.inputEnabled = true;
	this.star.events.onInputUp.add(this.close, this);

	//allow input for surgeryObjects
	for (var i = 0; i < this.surgeryObjects.length; i++){
		this.surgeryObjects[i].inventory = false;
		this.surgeryObjects[i].inputEnabled = true; //TODO: remove this
		this.surgeryObjects[i].input.enableDrag(true); //TODO: remove this
		this.surgeryObjects[i].events.onInputUp.add(this.addToInventory, this);
	}

	//allow input for libraryObjects
	for (var i = 0; i < this.libraryObjects.length; i++){
		this.libraryObjects.inputEnabled = true;
		this.libraryObjects[i].events.onInputUp.add(this.open, this, i+1); //i+1 is the book number
	}

	//bring window sprites to front and turn invisible
	for (var i = 0; i < this.windowSprites.length; i++){
		game.world.bringToTop(this.windowSprites[i]);
		this.windowSprites[i].visible = false;
	}

	this.loadSurgery();
};

gameplayState.prototype.update = function(){

	//disable surgeryObjects and libraryObjects input while reading
	if (this.reading == "none"){
		for (var i = 0; i < this.surgeryObjects.length; i++){
			this.surgeryObjects[i].inputEnabled = true;
			this.libraryObjects[i].inputEnabled = true;
		}
	}
	else{
		for (var i = 0; i < this.surgeryObjects.length; i++){
			this.surgeryObjects[i].inputEnabled = false;
			this.libraryObjects[i].inputEnabled = false;
		}
	}
	
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
		this.star.visible = true;
		this.reading = "document";
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

//opens the book so that we can read it
gameplayState.prototype.open = function(sprite, pointer, n){
	if (n == 1){
		this.booksheet = this.book1sheet;
	}
	this.booksheet.visible = true;
	this.star.visible = true;
	this.reading = "book";
}

//close all window sprites
gameplayState.prototype.close = function(sprite, pointer){
	for (var i = 0; i < this.windowSprites.length; i++){
		this.windowSprites[i].visible = false;
	}
	this.reading = "none";
}
