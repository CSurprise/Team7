let Museum = function (shared)
{
    this.shared = shared;

    this.museum = game.add.sprite(0,0,"museum");
    
    this.museumObjects = [];
	this.museumObjects.push(game.add.sprite(374,1027,"jar1"));
	this.museumObjects.push(game.add.sprite(457,1034,"jar2"));
	this.museumObjects.push(game.add.sprite(589,1037,"jar3"));
	this.museumObjects.push(game.add.sprite(738,1029,"jar4"));
    this.museumObjects.push(game.add.sprite(259,1029,"jar5"));
    
    for (var i = 0; i < this.museumObjects.length; i++)
    {
		this.museumObjects[i].inputEnabled = true;
		this.museumObjects[i].events.onInputUp.add(this.ShowJar, this);
    }
    
    this.uiJars = [];
    this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar1"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar2"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar3"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar4"));
    this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar5"));

    // anchor everything
    for (var i = 0; i < this.uiJars.length; i++)
    {
        this.uiJars[i].anchor.set(0.5, 0.5);
        this.uiJars[i].visible = false;
    }

    this.closeX = game.add.sprite(910,430,"closeX");
    this.closeX.inputEnabled = true;
    this.closeX.events.onInputUp.add(this.CloseJar, this);
    this.closeX.visible = false;
};

Museum.prototype.Show = function () { this.SetVisibility(true);  };
Museum.prototype.Hide = function () { this.SetVisibility(false); };

Museum.prototype.EnableInput  = function () { this.SetInput(true);  };
Museum.prototype.DisableInput = function () { this.SetInput(false); };

// do a curried function thing here so there's not this big case statement
Museum.prototype.ShowJar = function(sprite, pointer) 
{
    this.shared.DisableInput();
    this.viewjar = null;
    for (var i = 0; i < this.museumObjects.length; i++)
    {
        if (sprite == this.museumObjects[i]) { this.viewjar = this.uiJars[i]; break; }
    }
	this.viewjar.visible = true;
	this.closeX.visible = true;
    this.shared.reading = true;
}

Museum.prototype.CloseJar = function (sprite, pointer)
{
    this.shared.EnableInput();
    this.viewjar.visible = false;
    this.closeX.visible = false;
    this.shared.reading = false;
}

Museum.prototype.SetVisibility = function (vis)
{
    this.museum.visible = vis;
    for (var i = 0; i < this.museumObjects.length; i++){
		this.museumObjects[i].visible = vis;
	}
};

Museum.prototype.SetInput = function (input)
{
    for (var i = 0; i < this.museumObjects.length; i++)
    {
        this.museumObjects[i].inputEnabled = input;
    }
};