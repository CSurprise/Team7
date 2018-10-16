let menu = function(){

};

menu.prototype.create = function(){
    this.backMus = game.add.audio("Background Music", 1, true);
    this.backMus.play();
    this.selectSound = game.add.audio("SelectSound", 1, false);
    this.background = game.add.sprite(0,0,"startMenu");
    this.startButton = game.add.sprite(0,0,"mainStartButton");
    this.overlay = game.add.sprite(0,0,"overlay");
    this.overlay.visible = false;
    
    this.startButton.inputEnabled = true; 
    this.startButton.events.onInputDown.add(this.buttonDown, this);
    this.startButton.events.onInputUp.add(this.showOverlay, this);

    this.overlay.inputEnabled = true;
    this.overlay.events.onInputDown.add(this.startGame, this);

    this.string = "Intro Text"
    this.text = game.add.existing(new Phaser.Text(game, 200, 600, this.string, {
        font:'bold 50pt Arial',
        fill: "#ffffff",
		wordWrap:true,
        wordWrapWidth:700
    }));
    this.text.visible = false;
};

menu.prototype.update = function(){

};

menu.prototype.showOverlay = function(sprite, pointer){
    this.buttonUp(this.startButton);
    this.overlay.visible = true;
    this.text.visible = true;
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