/*
1. Heart
2. Lungs
3. Liver
4. Stomach
5. Intestines
*/

let gameplayState = function () {};

gameplayState.prototype.create = function(){

	this.selectSound = game.add.audio("SelectSound", 3, false);
	
	// A VARIABLE FOR ANYTHING THAT NEEDS TO BE SHARED BETWEEN SCENES
	let sharedEnableInput  = () => { this.EnableInput();  };
	let sharedDisableInput = () => { this.DisableInput(); };

	this.shared = 
	{
		inventorySize: 0, // Size of the inventory
		reading: false,   // if we're reading
		holdingOrgan: false,
		EnableInput:  function () { sharedEnableInput();  },
		DisableInput: function () { sharedDisableInput(); }
	};

	//important variables
	this.location = null; //current location

	this.books = [];
	this.bookData = game.cache.getJSON("bookD");
	this.getBookText();
	


	//UI sprites
	this.locations = game.add.sprite(0, 0, "locations");
	this.inventory = game.add.sprite(0, game.world.height - 250, "inventory");
	this.surgeryIcon = game.add.sprite(100, 90, "surgeryIcon");
	this.libraryIcon = game.add.sprite(300, 90, "libraryIcon");
	this.museumIcon = game.add.sprite(500, 90, "museumIcon");
	this.docIcon = game.add.sprite(900, 90, "docIcon");

	// Setup all scenes
	this.museumScene = new Museum(this.shared, this.jarText);
	this.libraryScene = new Library(this.shared, this.books);
	this.surgeryScene = new Surgery(this.shared);

	//document sprites
	this.document = game.add.sprite(0, 0, "document");
	this.closeX = game.add.sprite(910,430,"closeX");

	this.windowSprites = [];
	this.windowSprites.push(this.document);
	this.windowSprites.push(this.closeX);

	//allow input for buttons
	this.surgeryIcon.inputEnabled = true;
	this.surgeryIcon.events.onInputDown.add(this.buttonDown, this);
	this.surgeryIcon.events.onInputUp.add(this.surgeryIconTap, this);
	this.libraryIcon.inputEnabled = true;
	this.libraryIcon.events.onInputDown.add(this.buttonDown, this);
	this.libraryIcon.events.onInputUp.add(this.libraryIconTap, this);
	this.museumIcon.inputEnabled = true;
	this.museumIcon.events.onInputDown.add(this.buttonDown, this);
	this.museumIcon.events.onInputUp.add(this.museumIconTap, this);
	this.docIcon.inputEnabled = true;
	this.docIcon.events.onInputDown.add(this.buttonDown, this);
	this.docIcon.events.onInputUp.add(this.docIconTap, this);

	//windowsprite buttons
	this.closeX.inputEnabled = true;
	this.closeX.events.onInputDown.add(this.buttonDown, this);
	this.closeX.events.onInputUp.add(this.close, this);

	//bring window sprites to front, center, and turn invisible
	for (var i = 0; i < this.windowSprites.length; i++){
		game.world.bringToTop(this.windowSprites[i]);
		this.center(this.windowSprites[i]);
		this.windowSprites[i].visible = false;
	}
	
	//set specific locations for closeX and arrows
	this.setPos(this.closeX, 910, 430);

	this.loadSurgery();

	// TEMPORARY CASE STUFF; TODO REPLACE LATER
	this.diseaseNames = [
		"Pormonary Ateriosing Malformation", "Vindincitis", "Hitamshina",
		"Left Heart Dwarfism", "Kernsworm", "Wubwuboomp",
		"Polyp Cystists Disease", "Guanille", "Leporchuss",
		"Yellow Jacket Stomach Disease", "Barnyard Disease",
		"Chun Deyahn", "Porisingai"
	];
	this.solution = ["Vindincitis", "Kernsworm", "Porisingai"];
	this.caseText = ["Name: Hun-Gi “Jenkins” Kim\n\n" +
		"Statement from his son:\n\n" +
		"“The sickness didn’t take him all at once…\n" + 
		"He was born 10/15/1872 with the inability to talk, we only knew never to bring him to the doctor. Grandma said when he was eight that they tried to bring him to the doctor to see why he refused to speak. Everyone had assumed he was a mute due to a form of autism but as he grew, it became ever more apparent that he could not speak however autism was not the culprit. His whole life he was on the farm, no school experience, only how to manage the farm. However whenever he tried to do the harder work with his father his heart would beat wildy because he could not keep up. Yet through all the strife he still pushed himself, taking multiple breaks at a time due to the inability to breathe properly.”\n\n" + 
		"Darkness was coming.",                             
		"“The first signs came when he was 34 when it was time for him to take over the farm except it was because his father had died. Two weeks after mom noticed his veins were changing color into a very faint black. Again he refused to leave the farm, violently reacting to the suggestion of seeing a doctor, throwing things around yet no words, only tears.\n" +
		"Mother told us that after that scene when he went to their room that he could not stand. Father laid in bed for 2 hours heavily breathing before he could return back to the fields.”\n\n" +
		"The Final Feast\n\n" +                               
		"“My wife and I realized that dad never ate any food that wasn't grown on the potato farm. When me and my wife travelled back to her hometown in Singapore we brought back some Bak Kuh Teh. It was said that this dish’s origins trace back to an old beggar, a man who approached a shop and asked for something, anything to spare. However the owner could not spare any food or else he would not able to afford rent the next day. The owner decided to create something for the beggar though, this new dish that involves the use of leftover pork bones with an arrangement of spices to create a more affordable yet delectable choice for dinner.”"
	];

	// Set up report objects
	this.docCorner = { x: 250 , y: 600 };
	this.report = new Report(this.docCorner.x, this.docCorner.y, this.caseText, 
		this.diseaseNames, this.solution, this.shared);
	this.report.disable();
};

gameplayState.prototype.update = function()
{
	// check for a swipe -- Inspired by https://gist.github.com/eguneys/5cf315287f9fbf413769
    swipe_length = Phaser.Point.distance(game.input.activePointer.position, game.input.activePointer.positionDown);
    swipe_time = game.input.activePointer.duration;
    if (swipe_length > 100 && swipe_time > -1 && swipe_time < 250 && this.location === 'surgery' && !this.shared.holdingOrgan)
    {
        this.surgeryScene.HandleSwipe(new Phaser.Line(
			game.input.activePointer.positionDown.x, game.input.activePointer.positionDown.y,
            game.input.activePointer.position.x, game.input.activePointer.position.y));
    } 
};

//switches to the surgery location
gameplayState.prototype.loadSurgery = function(){
	this.location = "surgery";
	this.surgeryScene.Show();
	this.museumScene.Hide();
	this.libraryScene.Hide();
}

//shows libraryFront
gameplayState.prototype.loadLibrary = function(){
	this.location = "library";
	this.surgeryScene.Hide();
	this.museumScene.Hide();
	this.libraryScene.Show();
}


//switches to the museum location
gameplayState.prototype.loadMuseum = function(){
	this.location = "museum";
	this.surgeryScene.Hide();
	this.museumScene.Show();
	this.libraryScene.Hide();
}

//button functions
gameplayState.prototype.surgeryIconTap = function(){
	this.buttonUp(this.surgeryIcon);
	if (!this.shared.reading) { this.loadSurgery(); }
}
gameplayState.prototype.libraryIconTap = function(){
	this.buttonUp(this.libraryIcon);
	if (!this.shared.reading) { this.loadLibrary(); }
}
gameplayState.prototype.museumIconTap = function(){
	this.buttonUp(this.museumIcon);
	if (!this.shared.reading) { this.loadMuseum(); }
}
gameplayState.prototype.docIconTap = function(){
	this.buttonUp(this.docIcon);
	if (!this.shared.reading) {
		this.document.visible = true;
		this.report.toReport();
		this.closeX.visible = true;
		this.shared.reading = true;
	}
}

gameplayState.prototype.EnableInput = function ()
{
	this.surgeryScene.EnableInput();
	this.museumScene.EnableInput();
	this.libraryScene.EnableInput();
	this.closeX.inputEnabled = true;
	this.document.inputEnabled = true;
};

gameplayState.prototype.DisableInput = function ()
{
	this.surgeryScene.DisableInput();
	this.museumScene.DisableInput();
	this.libraryScene.DisableInput();
	this.closeX.inputEnabled = false;
	this.document.inputEnable = false;
};

//close all window sprites
gameplayState.prototype.close = function(sprite, pointer){
	this.buttonUp(this.closeX);
	for (var i = 0; i < this.windowSprites.length; i++){
		this.windowSprites[i].visible = false;
	}
	this.shared.reading =  false;
	//this.pageText.visible = false;
	this.report.disable();
}

//move sprite to center of screen
gameplayState.prototype.center = function(sprite){
	sprite.x = (game.world.width - sprite.width)/2;
	sprite.y = (game.world.height - sprite.height)/2;
}

//helper functions
gameplayState.prototype.setPos = function(sprite, X, Y){
	sprite.x = X;
	sprite.y = Y;
}
gameplayState.prototype.buttonDown = function(sprite){
	this.selectSound.play();
	sprite.scale.set(.8,.8);
	sprite.x += sprite.width*.1;
	sprite.y += sprite.height*.1;
}
gameplayState.prototype.buttonUp = function(sprite){
	sprite.scale.set(1, 1);
	sprite.x -= sprite.width*.08;
	sprite.y -= sprite.height*.08;
}

gameplayState.prototype.getBookText = function(){
	for(i in this.bookData.Books){
		this.books.push(this.bookData.Books[i].Pages);
	}
}

gameplayState.prototype.getJarText = function(){
	for(i in this.jarData.Jars){
		this.jarText.push(this.jarData.Jars[i].jarList)
	}
}