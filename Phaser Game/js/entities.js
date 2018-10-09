/** @constructor */
let entities = function(x, y, image)
{
    this.height = 200;
    this.width = 200;
    this.x = x;
    this.y = y;
    this.objImg = image; //Background for the Pop Up
    this.objSprite;
    this.objPop;
    this.gameObj;
};


entities.prototype.placeSprite =  function(game){
  gameObj = game;
  this.objSprite = game.add.sprite(this.x, this.y, this.objImg);


  /*Enables clicking on obj to bring pop up*/
  this.objSprite.inputEnabled = true;
  this.objSprite.input.useHandCursor = true;
  this.objSprite.events.onInputDown.add(this.createPop_Up, this.objPop);
};


/*Creates pop up window when obj is clicked*/
entities.prototype.createPop_Up = function(pop) {
  pop = new pop_up();
  pop.create(game);
};

/*----------------------------- Child Classes ----------------------------------*/

/*Entity Child - Book*/
let book = function (){
    this.pages;
    this.curPage = 0;
};
book.prototype = new entities();

book.prototype.turnPage = function(){
    this.curPage += 1;
}

book.prototype.printCurPage = function(){
    console.log(this.curPage);
    console.log(this.height);
};


/*Entity Child - Organ*/
let organ = function (){
    this.type;
};
organ.prototype = new entities();


organ.prototype.printType = function(){
    console.log(this.curPage);
    console.log(this.height);
};
