/** @constructor */
let pop_up = function()
{
    this.height = 200;
    this.width = 200;
    this.x = 100;
    this.y = 100;
    this.window; //Background for the Pop Up
};

pop_up.prototype.create = function(game){

    //this.window = new Phaser.Rectangle(this.x,this.y, this.height, this.width);

    /*Place Holding Graphic for pop up*/
    this.window = game.add.graphics(100, 100);
    this.window.beginFill(0xFF3300);
    this.window.drawRect(this.x, this.y, this.height, this.width);
    this.window.endFill();


    /*Enables pressing on pop up window to destroy popUp. Will change this to pressing an exit button later.*/
    this.window.inputEnabled = true;
    this.window.input.useHandCursor = true;
    this.window.events.onInputDown.add(this.clickedOff, this.window);
};


/*Exit pop up*/
pop_up.prototype.clickedOff = function(win){
    win.destroy();

};
