let Surgery = function (shared)
{
    this.cutSound = game.add.audio("Cut", 3, false);
    
    this.organ = null;

    this.shared = shared;
    this.surgery = game.add.sprite(0,0,"surgery");

    this.surgeryObjects = [];
	this.surgeryObjects.push(game.add.existing(new Organ(366,1433,"intestines",[{x:240,y:430,angle:0}])));
	this.surgeryObjects.push(game.add.existing(new Organ(537,1135,"stomach",[{x:150,y:0,angle:0},{x:20,y:270,angle:0}])));
	this.surgeryObjects.push(game.add.existing(new Organ(366,1177,"liver",[{x:170,y:0,angle:0}])));
	this.surgeryObjects.push(game.add.existing(new Organ(366,737,"lungs",[{x:210,y:0,angle:0}])));
    this.surgeryObjects.push(game.add.existing(new Organ(549,839,"heart",[{x:50,y:0,angle:2*Math.PI-0.25}])));
    
    this.uiOrgans = [];
    this.uiOrgans.push(game.add.sprite(game.world.width/2, game.world.height/2, "intestinesSick"));
	this.uiOrgans.push(game.add.sprite(game.world.width/2, game.world.height/2, "stomachSick"));
	this.uiOrgans.push(game.add.sprite(game.world.width/2, game.world.height/2, "liverSick"));
	this.uiOrgans.push(game.add.sprite(game.world.width/2, game.world.height/2, "lungsSick"));
    this.uiOrgans.push(game.add.sprite(game.world.width/2, game.world.height/2, "heartSick"));

    // anchor everything
    for (var i = 0; i < this.uiOrgans.length; i++)
    {
        this.uiOrgans[i].anchor.set(0.5, 0.5);
        this.uiOrgans[i].visible = false;
    }

    for (var i = 0; i < this.surgeryObjects.length; i++)
    {
		this.surgeryObjects[i].inventory = false;
		this.surgeryObjects[i].events.onInputUp.add(this.AddToInventory, this);
    }
    
    this.closeX = game.add.sprite(910,430,"closeX");
    this.closeX.inputEnabled = true;
    this.closeX.events.onInputDown.add(this.buttonDown, this);
    this.closeX.events.onInputUp.add(this.CloseOrgan, this);
    this.closeX.visible = false;
};

Surgery.prototype.Show = function () { this.SetVisibility(true);  };
Surgery.prototype.Hide = function () { this.SetVisibility(false); };

Surgery.prototype.EnableInput  = function () { this.SetInput(true);  };
Surgery.prototype.DisableInput = function () { this.SetInput(false); };

Surgery.prototype.AddToInventory = function (sprite, pointer) {
    if (sprite.y > 1900)
    { //is sprite close to inventory?
        if (sprite.inventory == false)
        { //is it already in inventory?
			sprite.inventory = true;
			this.shared.inventorySize++;
			sprite.scale.set(.4,.4);
			sprite.x = this.shared.inventorySize*200 - 100;
			sprite.y = 2220;
            sprite.input.draggable = false;
            sprite.events.onInputDown.add(this.buttonDownOrgan, this);
            sprite.events.onInputUp.add(this.ShowOrgan, this);
		}
	}    
};

Surgery.prototype.SetVisibility = function (vis)
{
    this.surgery.visible = vis;
    for (var i = 0; i < this.surgeryObjects.length; i++)
    {
        this.surgeryObjects[i].visible = (this.surgeryObjects[i].inventory ? true : vis);
    }
};

Surgery.prototype.SetInput = function (input)
{
    for (var i = 0; i < this.surgeryObjects.length; i++)
    {
        this.surgeryObjects[i].inputEnabled = input;
    }
};

Surgery.prototype.HandleSwipe = function (swipe)
{
    this.cutSound.play();
    for (var i = 0; i < this.surgeryObjects.length; i++)
    {
        this.surgeryObjects[i].check_cut(swipe);
    }
};

Surgery.prototype.ShowOrgan = function (sprite, pointer)
{
    this.buttonUpOrgan(sprite);
    this.shared.DisableInput();

    this.organ = null;
	for (var i = 0; i < this.surgeryObjects.length; i++)
    {
        if (sprite == this.surgeryObjects[i]) { this.organ = this.uiOrgans[i]; break; }
    }
    
    this.organ.visible = true;
	this.closeX.visible = true;
    this.shared.reading = true;
};

Surgery.prototype.CloseOrgan = function (sprite, pointer)
{
    this.buttonUp(this.closeX);
    this.shared.EnableInput();
    this.organ.visible = false;
    this.closeX.visible = false;
    this.shared.reading = false;
}

Surgery.prototype.buttonDown = function(sprite){
	sprite.scale.set(.8,.8);
	sprite.x += sprite.width*.1;
	sprite.y += sprite.height*.1;
}
Surgery.prototype.buttonUp = function(sprite){
	sprite.scale.set(1, 1);
	sprite.x -= sprite.width*.08;
	sprite.y -= sprite.height*.08;
}
Surgery.prototype.buttonDownOrgan = function(sprite){
	sprite.scale.set(.3,.3);
	sprite.x += sprite.width*.1;
	sprite.y += sprite.height*.1;
}
Surgery.prototype.buttonUpOrgan = function(sprite){
	sprite.scale.set(.4, .4);
	sprite.x -= sprite.width*.075;
	sprite.y -= sprite.height*.075;
}
Surgery.prototype.center = function(sprite){
	sprite.x = (game.world.width - sprite.width)/2;
	sprite.y = (game.world.height - sprite.height)/2;
}