let Report = function (x, y, caseText, diseases, solution, shared)
{
    this.shared = shared;
    this.caseText = caseText;
    this.diseases = diseases;
    this.solution = solution.slice().sort();

    /* CASE REPORT OBJECTS */
    this.toSubmitArrow = game.add.sprite(x + 500, y, "rightArrow");
    this.toSubmitArrow.inputEnabled = true;
    this.toSubmitArrow.events.onInputUp.add(this.toSubmit, this);
    // create the case text object
    this.caseTextObject = game.add.existing(new Phaser.Text(game, x, y + 200, this.caseText, {
		font:'bold 20pt Arial',
		wordWrap:true,
		wordWrapWidth:650
    }));

    /* CASE SUBMIT OBJECTS */
    this.toReportArrow = game.add.sprite(x, y, "leftArrow");
    this.toReportArrow.inputEnabled = true;
    this.toReportArrow.events.onInputUp.add(this.toReport, this);
    // instantiate selectors
    this.selectors = [];
    for (var i = 0; i < this.solution.length; i++)
    {
        this.selectors.push(new DiseaseSelector(x, y + (i * 150) + 200, this.diseases));
    }

    this.submit = game.add.sprite(0, y + 1000, "submit");
    this.submit.x = (game.world.width - this.submit.width)/2;
    this.submit.inputEnabled = true;
    this.submit.events.onInputDown.add(this.buttonDown, this);
    this.submit.events.onInputUp.add(this.evaluate, this);

    this.overlay = game.add.sprite(0, 0, "overlay");
    this.overlay.visible = false;
    this.finalText = game.add.text(game.world.width/2, game.world.height/2, "",
        { fill: '#ffffff', fontSize:40, align:'center', wordWrap: true, wordWrapWidth: 800 }
    );
    this.finalText.anchor.set(0.5,0.5)
    this.finalText.visible = false;

    this.returnToMenuButton = game.add.sprite(game.world.width/2, game.world.height - 300, "submit");
    this.returnToMenuButton.anchor.set(0.5, 0.5);
    this.returnToMenuButton.events.onInputUp.add(function (sprite, pointer){
        game.state.start("Menu");
    }, this);
    this.returnToMenuButton.visible = false;
};

Report.prototype.disable = function ()
{
    // set visibility
    this.toSubmitArrow.visible = false;
    this.toReportArrow.visible = false;
    this.caseTextObject.visible = false;
    for (var i = 0; i < this.selectors.length; i++) { this.selectors[i].setVisible(false); }
    this.submit.visible = false;
};

Report.prototype.disableInput = function ()
{
    this.toSubmitArrow.inputEnabled = false;
    this.toReportArrow.inputEnabled = false;
    this.submit.inputEnabled = false;
    for (var i = 0; i < this.selectors.length; i++)
    {
        this.selectors[i].leftArrow.inputEnabled = false;
        this.selectors[i].rightArrow.inputEnabled = false;
    }
    this.shared.DisableInput();
}

Report.prototype.toReport = function ()
{
    // disable submit objects
    this.toReportArrow.visible = false;
    for (var i = 0; i < this.selectors.length; i++) { this.selectors[i].setVisible(false); }
    this.submit.visible = false;
    // enable report objects
    this.caseTextObject.visible = true;
    this.toSubmitArrow.visible = true;
};

Report.prototype.toSubmit = function ()
{    
    // disable report objects
    this.caseTextObject.visible = false;
    this.toSubmitArrow.visible = false;
    // enabel submit objects  
    this.toReportArrow.visible = true;
    for (var i = 0; i < this.selectors.length; i++) { this.selectors[i].setVisible(true); }
    this.submit.visible = true;
};

Report.prototype.evaluate = function ()
{
    this.buttonUp(this.submit);
    let selected = [];
    for (var i = 0; i < this.selectors.length; i++)
    {
        selected.push(this.selectors[i].getSelectedDisease());
    }
    selected = selected.sort();
    let result = selected.filter(val => this.solution.indexOf(val) !== -1);
    result = result.filter((val, index) => result.indexOf(val) === index);
    this.end(result.length/this.solution.length);
};

Report.prototype.end = function (result)
{
    let grades = ["gradeF", "gradeC", "gradeB", "gradeA"];
    let outroTextPossible = [
        "Did you even attend Tan Teck Guan?!?!?! If F is for future then your future looks like its gonna be full of Fs.",
        "Just remember kid, C’s get degrees. Just don't expect to get hired as a doctor anywhere important.",
        "You put the B in Bee’s knees kid. Get it? Because you got a B. Hopefully you don't contract Yellow Jacket Stomach disease because that’s a killer but you knew that already didn't you.",
        "If they made a Baywatch for Doctors, you would be on it. Why not save the world, kid?"
    ];
    let index = Math.round(result*(grades.length-1));
    let grade = grades[index];
    this.outroText = outroTextPossible[index];
    // do the stamp thing
    this.disableInput();
    let gradeSprite = game.add.sprite(game.world.width/2, game.world.height/2, grades[index]);
    gradeSprite.anchor.set(0.5, 0.5);
    gradeSprite.scale.setTo(2, 2);
    gradeSprite.angle = -35;
    gradeSprite.alpha = 0;
    let gradeSpriteTween = game.add.tween(gradeSprite);
    gradeSpriteTween.to({alpha:1}, 500, Phaser.Easing.Quintic.In);
    gradeSpriteTween.onComplete.add(this.displayFinal, this);
    gradeSpriteTween.start();
    game.add.tween(gradeSprite.scale).to({x:0.6,y:0.6}, 500, Phaser.Easing.Quintic.In, true);

};

Report.prototype.displayFinal = function ()
{
    game.add.tween({empty:0})
        .to({empty:0}, 750, Phaser.Easing.Linear.None, true)
        .onComplete.add(
            function () {
                this.overlay.visible = true;
                game.world.bringToTop(this.overlay);
                this.finalText.visible = true;
                this.finalText.text = this.outroText;
                game.world.bringToTop(this.finalText);
                this.returnToMenuButton.visible = true;
                this.returnToMenuButton.inputEnabled = true;
                game.world.bringToTop(this.returnToMenuButton);
            }, this
        );
}

Report.prototype.buttonDown = function(sprite){
	sprite.scale.set(.8,.8);
	sprite.x += sprite.width*.1;
	sprite.y += sprite.height*.1;
}
Report.prototype.buttonUp = function(sprite){
	sprite.scale.set(1, 1);
	sprite.x -= sprite.width*.08;
	sprite.y -= sprite.height*.08;
}