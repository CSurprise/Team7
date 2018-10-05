let autopsyState = function () 
{

};

autopsyState.prototype.create = function ()
{
    this.empty_body = game.add.sprite(0, 0, "body");

    this.heart = new Heart(500, 1000);
    game.add.existing(this.heart);
};
