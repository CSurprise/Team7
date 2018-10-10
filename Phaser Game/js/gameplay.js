// gameplayState constructor

let gameplayState = function(){
	
};

gameplayState.prototype.create = function(){
	
	//important variables
	this.location = null; //current location
	this.inventorySize = 0; //number of objects in inventory

	//add UI sprites and backgrounds
	this.surgery = game.add.sprite(0,0,"surgery");
	this.library = game.add.sprite(0,0,"library");
	this.museum = game.add.sprite(0,0,"museum");
	this.locations = game.add.sprite(0, 0, "locations");
	this.inventory = game.add.sprite(0, game.world.height - 200, "inventory");
	this.star1 = game.add.sprite(200, 100, "star2"); this.star1.scale.set(3,3);
	this.star2 = game.add.sprite(400, 100, "star2"); this.star2.scale.set(3,3);
	this.star3 = game.add.sprite(600, 100, "star3"); this.star3.scale.set(3,3);

	//add surgery objects
	this.surgeryObjects = [];
	this.surgeryObjects.push(game.add.sprite(400,700,"heart"));
	this.surgeryObjects.push(game.add.sprite(400,900,"lungs"));
	this.surgeryObjects.push(game.add.sprite(400,1300,"liver"));
	this.surgeryObjects.push(game.add.sprite(400,1500,"stomach"));

	//add library objects
	this.libraryObjects = [];
	this.libraryObjects.push(game.add.sprite(300,500,"book"));

	//add museum objects
	this.museumObjects = [];

	//allow input for buttons
	this.star1.inputEnabled = true;
	this.star1.events.onInputDown.add(this.star1Tap, this);
	this.star2.inputEnabled = true;
	this.star2.events.onInputDown.add(this.star2Tap, this);
	this.star3.inputEnabled = true;
	this.star3.events.onInputDown.add(this.star3Tap, this);

	//allow input for surgeryObjects
	for (var i = 0; i < this.surgeryObjects.length; i++){
		this.surgeryObjects[i].inventory = false;
		this.surgeryObjects[i].inputEnabled = true; //TODO: remove this
		this.surgeryObjects[i].input.enableDrag(true); //TODO: remove this
		this.surgeryObjects[i].events.onInputUp.add(this.addToInventory, this);
	}

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
gameplayState.prototype.star1Tap = function(){
	this.loadSurgery();
}
gameplayState.prototype.star2Tap = function(){
	this.loadLibrary();
}
gameplayState.prototype.star3Tap = function(){
	this.loadMuseum();
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

