let autopsyState = function () 
{

};

autopsyState.prototype.create = function ()
{
    this.empty_body = game.add.sprite(0, 0, "body");

    this.heart = new Heart(500, 1000);
    game.add.existing(this.heart);

    game.input.onDown.add(this.start_cut, this);
    game.input.onUp.add(this.end_cut, this);

    this.cut_start = { x:0, y:0 };
    this.cut_end   = { x:0, y:0 };
};

autopsyState.prototype.start_cut = function (pos)
{
    this.cut_start.x = pos.x;
    this.cut_start.y = pos.y;
};

autopsyState.prototype.end_cut = function (pos)
{
    this.cut_end.x = pos.x;
    this.cut_end.y = pos.y;
    this.heart.check_cut(new Phaser.Line(this.cut_start.x, this.cut_start.y, this.cut_end.x, this.cut_end.y));
};