let Museum = function (shared)
{

    this.jarSelectSound = game.add.audio("JarSelect", 3, false);
    this.closeSound = game.add.audio("SelectSound", 3, false);

    this.shared = shared;

    this.museum = game.add.sprite(0,0,"museum");
    
    this.museumObjects = [];
    //layer1
    this.museumObjects.push(game.add.sprite(255,541,"jar1"));
	this.museumObjects.push(game.add.sprite(336,550,"jar6"));
	this.museumObjects.push(game.add.sprite(483,545,"jar1"));
	this.museumObjects.push(game.add.sprite(574,550,"jar7"));
    this.museumObjects.push(game.add.sprite(726,544,"jar5"));
    //layer2
    this.museumObjects.push(game.add.sprite(316,794,"jar4"));
	this.museumObjects.push(game.add.sprite(407,794,"jar4"));
	this.museumObjects.push(game.add.sprite(475,794,"jar6"));
	this.museumObjects.push(game.add.sprite(615,787,"jar1"));
    this.museumObjects.push(game.add.sprite(716,791,"jar5"));
    //layer3
	this.museumObjects.push(game.add.sprite(245,1031,"jar5"));
	this.museumObjects.push(game.add.sprite(358,1031,"jar4"));
	this.museumObjects.push(game.add.sprite(436,1034,"jar2"));
	this.museumObjects.push(game.add.sprite(564,1032,"jar3"));
    this.museumObjects.push(game.add.sprite(706,1031,"jar7"));
    //layer4
    this.museumObjects.push(game.add.sprite(277,1286,"jar4"));
	this.museumObjects.push(game.add.sprite(358,1282,"jar1"));
	this.museumObjects.push(game.add.sprite(431,1287,"jar2"));
	this.museumObjects.push(game.add.sprite(573,1296,"jar3"));
    this.museumObjects.push(game.add.sprite(726,1286,"jar5"));
    
    for (var i = 0; i < this.museumObjects.length; i++)
    {
		this.museumObjects[i].inputEnabled = true;
		this.museumObjects[i].events.onInputUp.add(this.ShowJar, this);
    }
    
    this.uiJars = [];
    //layer1
    this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar11"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar31"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar12"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar21"));
    this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar51"));
    //layer2
    this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar41"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar42"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar32"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar13"));
    this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar52"));
    //layer3
    this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar53"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar43"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar22"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar33"));
    this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar23"));
    //layer4
    this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar44"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar1"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar24"));
	this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar3"));
    this.uiJars.push(game.add.sprite(game.world.width/2, game.world.height/2, "viewjar5"));

    this.jarText = game.cache.getJSON("jarD"); 
    this.pageText = game.add.existing(new Phaser.Text(game, 330, 1750, "", { 
		font:'bold 30pt Arial', 
		wordWrap:true, 
		wordWrapWidth:650 
	})); 
 


    // anchor everything
    for (var i = 0; i < this.uiJars.length; i++)
    {
        this.uiJars[i].anchor.set(0.5, 0.5);
        this.uiJars[i].visible = false;
    }

    this.closeX = game.add.sprite(910,430,"closeX");
    this.closeX.inputEnabled = true;
    this.closeX.events.onInputDown.add(this.buttonDown, this);
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
    this.jarSelectSound.play(); 
    this.shared.DisableInput();
    this.viewjar = null;
    for (var i = 0; i < this.museumObjects.length; i++)
    {
        if (sprite == this.museumObjects[i]) {  
            this.viewjar = this.uiJars[i];  
            this.pageText.setText(this.jarText.Jars[i]);  
            break;  
        }  
    }
	this.viewjar.visible = true;
	this.closeX.visible = true;
    this.shared.reading = true;
    this.pageText.visible = true;  
}

Museum.prototype.CloseJar = function (sprite, pointer)
{
    this.closeSound.play(); 
    this.buttonUp(this.closeX);
    this.shared.EnableInput();
    this.viewjar.visible = false;
    this.closeX.visible = false;
    this.shared.reading = false;
    this.pageText.visible = false; 
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

Museum.prototype.buttonDown = function(sprite){
	sprite.scale.set(.8,.8);
	sprite.x += sprite.width*.1;
	sprite.y += sprite.height*.1;
}
Museum.prototype.buttonUp = function(sprite){
	sprite.scale.set(1, 1);
	sprite.x -= sprite.width*.08;
	sprite.y -= sprite.height*.08;
}