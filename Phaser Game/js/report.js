let Report = function (x, y, caseText, diseases, solution)
{
    this.caseText = caseText;
    this.diseases = diseases;
    this.solution = solution;

    this.solution.sort();

    // create the case text object
    this.caseTextObject = game.add.existing(new Phaser.Text(game, x, y, this.caseText, {
		font:'bold 20pt Arial',
		wordWrap:true,
		wordWrapWidth:650
    }));
    
    // instantiate selectors
    this.selectors = [];
    for (var i = 0; i < this.solution.length; i++)
    {
        this.selectors.push(new DiseaseSelector(x, y + (i * 200) + 400, this.diseases));
    }

    this.submit = game.add.sprite(x, y + 1000, "jar1");
    this.submit.inputEnabled = true;
    this.submit.events.onInputUp.add(this.evaluate, this);
}

Report.prototype.setVisible = function (vis)
{
    // set visibility
    this.caseTextObject.visible = vis;
    for (var i = 0; i < this.selectors.length; i++) { this.selectors[i].setVisible(vis); }
    this.submit.visible = vis;
}

Report.prototype.evaluate = function ()
{
    let selected = [];
    for (var i = 0; i < this.selectors.length; i++)
    {
        selected.push(this.selectors[i].getSelectedDisease());
    }
    selected.sort();
    for (var i = 0; i < selected.length; i++)
    {
        if (selected[i] !== this.solution[i]) { console.log("FAILED"); return; }
    }
    console.log("SUCCESS!"); return;
}