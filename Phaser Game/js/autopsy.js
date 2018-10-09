let autopsyState = function () 
{

};

autopsyState.prototype.create = function ()
{
    game.debug.start();
    this.empty_body = game.add.sprite(0, 0, "body");

    this.organs = [];
    this.organs.push(new Organ(500, 1000, "heart", [{ x:199, y:0, angle:0, intact:true },{ x:0, y:200, angle:Math.PI/2, intact:true}]));
    this.organs.push(new Organ(300, 1200, "heart", [{ x:199, y:0, angle:0, intact:true },{ x:0, y:200, angle:Math.PI/2, intact:true}]));

    for (i = 0; i < this.organs.length; i++) { game.add.existing(this.organs[i]); }
};

autopsyState.prototype.handle_swipe = function (swipe)
{
    for (i = 0; i < this.organs.length; i++)
    {
        this.organs[i].check_cut(swipe);
    }
};

autopsyState.prototype.update = function ()
{
    // check for a swipe -- Inspired by https://gist.github.com/eguneys/5cf315287f9fbf413769
    swipe_length = Phaser.Point.distance(game.input.activePointer.position, game.input.activePointer.positionDown);
    swipe_time = game.input.activePointer.duration;
    if (swipe_length > 100 && swipe_time > -1 && swipe_time < 250)
    {
        console.log("HANDLING SWIPE");
        this.handle_swipe(new Phaser.Line(game.input.activePointer.positionDown.x, game.input.activePointer.positionDown.y,
            game.input.activePointer.position.x, game.input.activePointer.position.y));
    }   
};