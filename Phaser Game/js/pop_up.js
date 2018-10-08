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
    this.window = game.add.graphics(100, 100);
    this.window.beginFill(0xFF3300);
    this.window.drawRect(this.x, this.y, this.height, this.width);
    this.window.endFill();

};

pop_up.prototype.clickedOff = function(){
    this.window.destroy();

}
