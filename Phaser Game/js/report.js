let Report = function (x, y, caseText, diseases, solution)
{
    this.caseText = caseText;
    this.diseases = diseases;
    this.solution = solution;

    this.solution.sort();

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
        this.selectors.push(new DiseaseSelector(x, y + (i * 200) + 200, this.diseases));
    }

    this.submit = game.add.sprite(x, y + 1000, "jar1");
    this.submit.inputEnabled = true;
    this.submit.events.onInputUp.add(this.evaluate, this);
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
};