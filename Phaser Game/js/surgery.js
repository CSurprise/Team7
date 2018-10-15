let Surgery = function (shared)
{
    this.shared = shared;
    this.surgery = game.add.sprite(0,0,"surgery");

    this.surgeryObjects = [];
	this.surgeryObjects.push(game.add.existing(new Organ(366,1433,"intestines",[{x:240,y:430,angle:0}])));
	this.surgeryObjects.push(game.add.existing(new Organ(537,1135,"stomach",[{x:150,y:0,angle:0},{x:20,y:270,angle:0}])));
	this.surgeryObjects.push(game.add.existing(new Organ(366,1177,"liver",[{x:170,y:0,angle:0}])));
	this.surgeryObjects.push(game.add.existing(new Organ(366,737,"lungs",[{x:210,y:0,angle:0}])));
	this.surgeryObjects.push(game.add.existing(new Organ(549,839,"heart",[{x:50,y:0,angle:2*Math.PI-0.25}])));

    for (var i = 0; i < this.surgeryObjects.length; i++)
    {
		this.surgeryObjects[i].inventory = false;
		this.surgeryObjects[i].events.onInputUp.add(this.AddToInventory, this);
	}
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
			sprite.y = 2250;
			sprite.input.draggable = false;
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
    for (var i = 0; i < this.surgeryObjects.length; i++)
    {
        this.surgeryObjects[i].check_cut(swipe);
    }
};