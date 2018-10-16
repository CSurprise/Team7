/*
1. Heart
2. Lungs
3. Liver
4. Stomach
5. Intestines
*/

let gameplayState = function () {};

gameplayState.prototype.create = function(){

	// A VARIABLE FOR ANYTHING THAT NEEDS TO BE SHARED BETWEEN SCENES
	let sharedEnableInput  = () => { this.EnableInput();  };
	let sharedDisableInput = () => { this.DisableInput(); };

	this.shared = 
	{
		inventorySize: 0, // Size of the inventory
		reading: false,   // if we're reading
		EnableInput:  function () { sharedEnableInput();  },
		DisableInput: function () { sharedDisableInput(); }
	};

	//important variables
	this.location = null; //current location

	this.books = [];
	this.bookData = game.cache.getJSON("bookD");
	this.getBookText();
	
	this.jarText = [];
	this.jarData = game.cache.getJSON("jarD");
	this.getJarText();

	//UI sprites
	this.locations = game.add.sprite(0, 0, "locations");
	this.inventory = game.add.sprite(0, game.world.height - 250, "inventory");
	this.surgeryIcon = game.add.sprite(100, 90, "surgeryIcon");
	this.libraryIcon = game.add.sprite(300, 90, "libraryIcon");
	this.museumIcon = game.add.sprite(500, 90, "museumIcon");
	this.docIcon = game.add.sprite(900, 90, "docIcon");

	// Setup all scenes
	this.surgeryScene = new Surgery(this.shared);
	this.museumScene = new Museum(this.shared, this.jarText);
	this.libraryScene = new Library(this.shared, this.books);

	//document sprites
	this.document = game.add.sprite(0, 0, "document");
	this.closeX = game.add.sprite(910,430,"closeX");

	this.windowSprites = [];
	this.windowSprites.push(this.document);
	this.windowSprites.push(this.closeX);

	//allow input for buttons
	this.surgeryIcon.inputEnabled = true;
	this.surgeryIcon.events.onInputUp.add(this.surgeryIconTap, this);
	this.libraryIcon.inputEnabled = true;
	this.libraryIcon.events.onInputUp.add(this.libraryIconTap, this);
	this.museumIcon.inputEnabled = true;
	this.museumIcon.events.onInputUp.add(this.museumIconTap, this);
	this.docIcon.inputEnabled = true;
	this.docIcon.events.onInputUp.add(this.docIconTap, this);

	//windowsprite buttons
	this.closeX.inputEnabled = true;
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
	this.diseaseNames = ["Disease A","B Syndrome","Infection Type C"];
	this.solution = ["B Syndrome", "Disease A"];
	this.caseText = 'Name: Wyatt Claude\nRace: Caucasian\nAge: 45\nGender: Male\nAlignment: Farmer\nReligion: Christian\nWeight: 86.2kg\nHeight: 1.88m\n' +
	'Background: A rural potato farmer, Wyatt was always outside in his potato farm. Most days he'+
	'did not wear shoes and would spend all day from morning to night tending to the potatoes only'+
	'stopping to use the bathroom and eat food. He was beginning to use the bathroom much more' +
	'frequently in his last days. The farm was known for not using any pesticides and being all' +
	'organic.';

	// Set up report objects
	this.docCorner = { x: 250 , y: 600 };
	this.report = new Report(this.docCorner.x, this.docCorner.y, this.caseText, this.diseaseNames, this.solution);
	this.report.disable();
};

gameplayState.prototype.update = function()
{
	// check for a swipe -- Inspired by https://gist.github.com/eguneys/5cf315287f9fbf413769
    swipe_length = Phaser.Point.distance(game.input.activePointer.position, game.input.activePointer.positionDown);
    swipe_time = game.input.activePointer.duration;
    if (swipe_length > 100 && swipe_time > -1 && swipe_time < 250 && this.location === 'surgery')
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
	if (!this.shared.reading) { this.loadSurgery(); }
}
gameplayState.prototype.libraryIconTap = function(){
	if (!this.shared.reading) { this.loadLibrary(); }
}
gameplayState.prototype.museumIconTap = function(){
	if (!this.shared.reading) { this.loadMuseum(); }
}
gameplayState.prototype.docIconTap = function(){
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
};

gameplayState.prototype.DisableInput = function ()
{
	this.surgeryScene.DisableInput();
	this.museumScene.DisableInput();
	this.libraryScene.DisableInput();
};

//close all window sprites
gameplayState.prototype.close = function(sprite, pointer){
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