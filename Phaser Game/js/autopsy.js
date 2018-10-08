let autopsyState = function () 
{

};

autopsyState.prototype.create = function ()
{
    game.debug.start();
    this.empty_body = game.add.sprite(0, 0, "body");

    this.heart = new Organ(500, 1000, "heart", [{ x:199, y:0, angle:0, intact: true },{ x:0, y:200, angle:Math.PI/2, intact: true}]);
    game.add.existing(this.heart);

    this.cut = new Phaser.Line(0,0,0,0);
};

autopsyState.prototype.update = function ()
{
    // check for a swipe -- Inspired by https://gist.github.com/eguneys/5cf315287f9fbf413769
    swipe_length = Phaser.Point.distance(game.input.activePointer.position, game.input.activePointer.positionDown);
    swipe_time = game.input.activePointer.duration;
    if (swipe_length > 100 && swipe_time > -1 && swipe_time < 250)
    {
        this.cut = new Phaser.Line(game.input.activePointer.positionDown.x, game.input.activePointer.positionDown.y,
            game.input.activePointer.position.x, game.input.activePointer.position.y);
        if (this.heart.check_cut(this.cut))
        {
            this.heart.inputEnabled = true;
            this.heart.input.enableDrag(true);
        }
    }   
};