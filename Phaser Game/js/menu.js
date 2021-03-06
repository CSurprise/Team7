let menu = function(){

};

menu.prototype.create = function(){
    this.selectSound = game.add.audio("SelectSound", 1, false);
    this.background = game.add.sprite(0,0,"startMenu");
    this.startButton = game.add.sprite(game.world.width/2,2000,"mainStartButton");
    this.title = game.add.text(game.world.width/2, 500, "Know The Path!",
        {align:'center', fontSize:250, fill:'#ffffff', 
        wordWrap:true, wordWrapWidth: 900, strokeThickness:20});
    this.title.anchor.set(0.5,0.5);
    
    this.startButton.anchor.set(0.5,0.5);
    this.overlay = game.add.sprite(0,0,"overlay");
    this.overlay.visible = false;
    
    this.startButton.inputEnabled = true; 
    this.startButton.events.onInputDown.add(this.buttonDown, this);
    this.startButton.events.onInputUp.add(this.showOverlay, this);

    this.overlay.inputEnabled = true;
    this.overlay.events.onInputDown.add(this.startGame, this);

    this.string = "The year is 1949, you are a medical student with a month left in the "+
    "Pathology program of the King Edward VII College of Medicine before the college converts to the University of Malaya.\n\n Your last "+
    "assignment is to use all your resources in the Tan Teck Guan building to identify the cause/causes of "+
    "death of a recently deceased man born and raised in the rural parts "+
    "of Singapore.\n\n\n\nWarning\n"+
    "This game was made by college students, not doctors. Please do not "+
    "try to diagnose anyone with these diseases."
    
    this.text = game.add.existing(new Phaser.Text(game, 150, 300, this.string, {
        font:'bold 50pt Arial',
        fill: "#ffffff",
		wordWrap:true,
        wordWrapWidth:900,
        align:'center'
    }));
    this.text.visible = false;
};

menu.prototype.update = function(){
    
};

menu.prototype.showOverlay = function(sprite, pointer){
    this.buttonUp(this.startButton);
    this.overlay.visible = true;
    this.text.visible = true;
    this.title.visible = false;
    this.startButton.visible = false;
};

menu.prototype.startGame = function(){
    game.state.start("Game");
};

menu.prototype.buttonDown = function(sprite){
    this.selectSound.play(); 
	sprite.scale.set(.8,.8);
	sprite.x += sprite.width*.1;
	sprite.y += sprite.height*.1;
};
menu.prototype.buttonUp = function(sprite){
    sprite.scale.set(1, 1);
	sprite.x -= sprite.width*.08;
	sprite.y -= sprite.height*.08;
}