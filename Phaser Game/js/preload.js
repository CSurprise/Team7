//constructor. A function constructor, no less!
let preloadState = function()
{

};

//when Phaser creates an instance of this state, we want it to
preloadState.prototype.preload = function()
{
    game.load.image('body', "assets/TEST_empty_body.png");
    game.load.image('heart', "assets/TEST_heart.png");
};

preloadState.prototype.create = function()
{
    game.state.start("Autopsy");
}