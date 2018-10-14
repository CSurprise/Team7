let DiseaseSelector = function(x, y, diseases)
{
    this.diseases = diseases;
    this.index = 0;

    // should extend sprite and make some object and some buttons.....
    this.rightArrow = game.add.sprite(x + 500, y, "rightArrow");
    this.rightArrow.inputEnabled = true;
    this.rightArrow.events.onInputUp.add(this.right, this);
    this.leftArrow = game.add.sprite(x, y, "leftArrow");
    this.leftArrow.inputEnabled = true;
    this.leftArrow.events.onInputUp.add(this.left, this);
    this.selectedDisease = game.add.existing(
        new Phaser.Text(game, x + 200, y + 50, this.diseases[this.index]));
}

DiseaseSelector.prototype.right = function()
{
    this.index = (((this.index + 1) % this.diseases.length) + this.diseases.length) % this.diseases.length;
    this.selectedDisease.text = this.diseases[this.index];
}

DiseaseSelector.prototype.left = function()
{
    this.index = (((this.index - 1) % this.diseases.length) + this.diseases.length) % this.diseases.length;
    this.selectedDisease.text = this.diseases[this.index];
}

DiseaseSelector.prototype.getSelectedDisease = function()
{
    return this.selectedDisease.text;
}

DiseaseSelector.prototype.setVisible = function (visibility)
{
    this.rightArrow.visible = visibility;
    this.leftArrow.visible = visibility;
    this.selectedDisease.visible = visibility;
}