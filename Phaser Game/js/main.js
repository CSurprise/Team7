let game = new Phaser.Game(1125, 2436, Phaser.AUTO);

game.state.add("Preload", preloadState);
game.state.add("Autopsy", autopsyState);
game.state.start("Preload");