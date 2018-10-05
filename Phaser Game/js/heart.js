let Heart = function (x, y)
{
    // essentially a super() call
    Phaser.Sprite.call(this, game, x, y, "heart");

};

// Here's where we do the extension
Heart.prototype = Object.create(Phaser.Sprite.prototype);