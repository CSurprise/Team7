let Library = function (shared, bookText)
{
    this.shared = shared;

    this.books = bookText;
    this.book = 0;
    this.page = 0;

	this.library = game.add.sprite(0,0,"library");
	this.libraryFront = game.add.sprite(0,300,"libraryFront");

	this.libraryObjects = [];
	this.libraryObjects.push(game.add.sprite(217,852,"book1"));
	this.libraryObjects.push(game.add.sprite(375,852,"book2"));
	this.libraryObjects.push(game.add.sprite(522,949,"book3"));
	this.libraryObjects.push(game.add.sprite(669,1141,"book4"));
	this.libraryObjects.push(game.add.sprite(10,852,"book5"));
	
	this.booksheet = game.add.sprite(game.world.width/2 - 400, game.world.height/2, "booksheet");
	this.booksheet.anchor.set(0.5,0.5);
	this.booksheet.scale.set(2,2);
	this.booksheet.animations.add("next", [0,1,2,3,4,5,6], 10, false);
    this.booksheet.animations.add("prev", [6,5,4,3,2,1,0], 10, false);
    
    this.closeX = game.add.sprite(910,430,"closeX");

    this.rightArrow = game.add.sprite(850,1800,"rightArrow");
    this.leftArrow = game.add.sprite(150,1800,"leftArrow");
    
    this.rightArrow.inputEnabled = true;
	this.rightArrow.events.onInputUp.add(this.NextPage, this);
	this.leftArrow.inputEnabled = true;
	this.leftArrow.events.onInputUp.add(this.PrevPage, this);
	this.closeX.inputEnabled = true;
	this.closeX.events.onInputUp.add(this.CloseBook, this);
    
    // set up some stuff for the zooming
    this.libraryFront.inputEnabled = true;
	this.libraryFront.events.onInputUp.add(function (sprite, pointer) {
        this.Zoom();
    }, this);

    for (var i = 0; i < this.libraryObjects.length; i++){
		this.libraryObjects[i].inputEnabled = true;
		this.libraryObjects[i].events.onInputUp.add(this.OpenBook, this);
    }
    
    this.pageText = game.add.existing(new Phaser.Text(game, 200, 600, "", {
		font:'bold 20pt Arial',
		wordWrap:true,
		wordWrapWidth:650
	}));
	this.pageText.visible = false;
	this.booksheet.visible = false;
	this.closeX.visible = false;
	this.leftArrow.visible = false;
	this.rightArrow.visible = false;

};

Library.prototype.OpenBook = function (sprite, pointer)
{ // TODO fix
	this.shared.DisableInput();
    this.booksheet.visible = true;
	this.closeX.visible = true;
	this.rightArrow.visible = true;
	this.shared.reading = true;

	//determine book
	if      (sprite == this.libraryObjects[0]) { this.book = 0; }
	else if (sprite == this.libraryObjects[1]) { this.book = 1; }
	else if (sprite == this.libraryObjects[2]) { this.book = 2; }
	else if (sprite == this.libraryObjects[3]) { this.book = 3; }
	else if (sprite == this.libraryObjects[4]) { this.book = 4; }

	//set to first page
	this.page = 0;
	this.pageText.setText(this.books[this.book][this.page]);
	this.pageText.visible = true;
};

Library.prototype.CloseBook = function (sprite, pointer)
{ // TODO implement
	this.shared.EnableInput();
	this.booksheet.visible = false;
	this.closeX.visible = false;
	this.rightArrow.visible = false;
	this.leftArrow.visible = false;
	this.shared.reading = false;
	this.pageText.visible = false;
};

Library.prototype.NextPage = function (sprite, pointer)
{
    if (this.page < this.books[this.book].length-1){
		this.page++;
		this.rightArrow.visible = false;
		this.pageText.visible = false;
		this.pageText.setText(this.books[this.book][this.page]);
		this.booksheet.animations.play("next");
		this.booksheet.animations.currentAnim.onComplete.add(function(){
			if (this.page != this.books[this.book].length-1) {this.rightArrow.visible = true;}
			if (this.page != 0) {this.leftArrow.visible = true;}
			this.pageText.visible = true;
		}, this);
	}
};

Library.prototype.PrevPage = function (sprite, pointer)
{
    if (this.page > 0){
		this.page--;
		this.leftArrow.visible = false;
		this.pageText.visible = false;
		this.pageText.setText(this.books[this.book][this.page]);
		this.booksheet.animations.play("prev");
		this.booksheet.animations.currentAnim.onComplete.add(function(){
			if (this.page != this.books[this.book].length-1) {this.rightArrow.visible = true;}
			if (this.page != 0) {this.leftArrow.visible = true;}
			this.pageText.visible = true;
		}, this);
	}
};

Library.prototype.Show = function () { this.SetVisibility(true);  };
Library.prototype.Zoom = function ()
{
	this.library.visible = true;
	for (var i = 0; i < this.libraryObjects.length; i++)
    {
        this.libraryObjects[i].visible = true;
	}
	this.libraryFront.visible = false;
};
Library.prototype.Hide = function () { this.SetVisibility(false); };

Library.prototype.EnableInput  = function () { this.SetInput(true);  };
Library.prototype.DisableInput = function () { this.SetInput(false); };

Library.prototype.SetVisibility = function (vis)
{
    this.library.visible = vis;
    for (var i = 0; i < this.libraryObjects.length; i++)
    {
        this.libraryObjects[i].visible = (vis ? false : vis);
	}
	//this.vooks
	this.libraryFront.visible = vis;
};

Library.prototype.SetInput = function (input)
{
    for (var i = 0; i < this.libraryObjects.length; i++)
    {
        this.libraryObjects.inputEnabled = input;
    }
};