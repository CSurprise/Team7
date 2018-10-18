let game = new Phaser.Game(1125, 2436, Phaser.AUTO);
function init() {
game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
game.scale.pageAlignVertically = true;
game.scale.pageAlignHorizontally = true;
}


game.state.add("Preload", preloadState);
game.state.add("Autopsy", autopsyState);
game.state.start("Preload");
