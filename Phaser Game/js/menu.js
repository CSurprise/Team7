let menu = function(){

};



menu.prototype.create = function(){
    this.background = game.add.sprite(0,0,"startMenu");
    this.startButton = game.add.sprite(0,0,"mainStartButton");


}

menu.prototype.update = function(){

    this.startButton.inputEnabled = true; 
    this.startButton.events.onInputUp.add(this.startGame);

}

menu.prototype.startGame = function(){
    game.state.start("Game");

}