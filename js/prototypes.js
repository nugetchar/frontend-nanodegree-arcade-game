"use strict";
/* ========================
 * MAPITEM CLASS          /
 * ========================
 */

/**
* @class MapItem
* @constructor
* @param {Integer} x : the x location of the character
* @param {Integer} y : the y location of the character
* @param {String} sprite : the picture of the character
*/
var MapItem = function(x, y, sprite){

    //If x is not defined, it is set to 0
    if(typeof x === 'undefined'){
        x = 0;
    }

    //If y is not defined, it is set to 0
    if(typeof y === 'undefined'){
        y = 0;
    }

    /**
    * The x location
    * @property x
    * @type Integer
    * @default 0
    */
    this.x = x;

    /**
    * The y location
    * @property y
    * @type Integer
    * @default 0
    */
    this.y = y;


    //TODO : DEFAULT VALUE
    this.sprite = sprite;
};

/**
* @method getX
* @brief get the MapItem's x location
* @return {Integer} x, the MapItem's x location
*/
MapItem.prototype.getX = function(){
    return this.x;
};


/**
* @method getY
* @brief get the MapItem's y location
* @return {Integer} y, the MapItem's y location
*/
MapItem.prototype.getY = function(){
    return this.y;
};

/**
* @method setX
* @brief set the MapItem's x location
* @param {Integer} x, the new MapItem's x location
*/
MapItem.prototype.setX = function(x){
    this.x = x;
};

/**
* @method setY
* @brief set the MapItem's y location
* @param {Integer} y, the new MapItem's y location
*/
MapItem.prototype.setY = function(y){
    this.y = y;
};

/**
* @method render
* @brief render the MapItem
*/
MapItem.prototype.render = function() {
    console.log(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* ==========================
* ENEMY CLASS              /
* ==========================
*/

/**
* @class Enemy
* @constructor
* @param {Integer} x : the x location of the character
* @param {Integer} y : the y location of the character
* @param {String} sprite : the MapItem's sprite
*/
var Enemy = function(x, y, sprite) {

    // Inheritance from MapItem
    MapItem.call(this, x, y, sprite);

    /**
    * A boolean to know if an enemy is out of the map
    * @property out
    * @type Boolean
    * @default false
    */
    this.out = false; //is the enemy out of the map ?
    

    /**
    * The enemy's speed
    * @property speed
    * @type Float
    * @default between 1 and 2
    */
    this.speed = (Math.random() * 2) + 1;
};

//Prototype chain
Enemy.prototype = Object.create(MapItem.prototype);
Enemy.prototype.constructor = Enemy;


/**
* @method update
* @brief update the enemy's position, required method for game
* @param {Float} dt, a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    setTimeout(this.move(), dt);
};

/**
* @method move
* @brief move the enemy, called by the update() method
*/
Enemy.prototype.move = function(){
    this.setX(this.getX() + this.speed);
    this.out = (this.getX() >= gameVars.LIMITS.outx);
};

/**
* @method isOut
* @brief is the enemy out of the map ?
* @return TRUE if the enemy is out, else FALSE
*/
Enemy.prototype.isOut = function(){
    return this.out;
};


/* ==========================
* PLAYER CLASS             /
* ==========================
*/

//TODO : MAKE THIS CLASS A SINGLETON

/**
* @class Player
* @constructor
* @param {Integer} x : the x location of the character
* @param {Integer} y : the y location of the character
* @param {String} sprite : the MapItem's sprite
*/
var Player = function(x, y, sprite) {

    // Inheritance from MapItem
    MapItem.call(this, x, y, sprite);

    /**
    * The player's x-movement
    * @property dx
    * @type Integer
    * @default 0
    */
    this.dx = 0;

    /**
    * The player's y-movement
    * @property dy
    * @type Integer
    * @default 0
    */
    this.dy = 0;

    /**
    * The player's area for collision detection
    * @property area
    * @type {Object}
    * @default {Object}
    */
    this.area = {
        'minx' : this.getX() - 50,
        'maxx' : this.getX() + 50,
        'miny' : this.getY() - 44.5,
        'maxy' : this.getY() + 44.5
    };

    /**
    * The player's score
    * @property score
    * @type {Integer}
    * @default 0
    */
    this.score = 0;

};

// Inheritance of prototype
Player.prototype = Object.create(MapItem.prototype);
Player.prototype.constructor = Player;

/**
* @method update
* @brief update the Player's position
*/
Player.prototype.update = function() {
    //update the x and y locations
    this.setX(this.getX() + this.dx);
    this.setY(this.getY() + this.dy);

    //update the player's area
    this.area.minx = this.getX() - 50;
    this.area.maxx = this.getX() + 50;
    this.area.miny = this.getY() - 44.5;
    this.area.maxy = this.getY() + 44.5;

    //stop the player
    this.stops();
};

/**
* @method handleInput
* @brief handle directions orders
* @param {String} direction
*/
Player.prototype.handleInput = function(direction){

    switch(direction) {
        //if left
        case 'left':
            //if we're at the edge of the map, we don't move
            if(this.x === gameVars.LIMITS.minx ){
                this.dx = 0;
            } else {
                //else we update the Player's movement
                this.dx = gameVars.STEPS.left;
            }

            this.dy = 0;
            break;

        //if right
        case 'right':
            if(this.x === gameVars.LIMITS.maxx ){
                this.dx = 0;
            } else {
                this.dx = gameVars.STEPS.right;
            }
            this.dy = 0;
            break;

        //if up
        case 'up':
            // We won
            if(this.y === gameVars.LIMITS.miny ){
                this.y = gameVars.initialPosition.y;
                this.x = gameVars.initialPosition.x;
                this.dy = 0;
                alert('Congratulations ! You won with ' + this.score + ' points.');
                this.score = 0;
            } else {
                this.dy = gameVars.STEPS.up;
            }
            this.dx = 0;
            break;

        //if down
        case 'down':
            if(this.y === gameVars.LIMITS.maxy ){
                this.dy = 0;
            } else {
                this.dy = gameVars.STEPS.down;
            }
            this.dx = 0;
            break;
        default:
    }
};

/**
* @method stops
* @brief stoping the player
*/
Player.prototype.stops = function(){
    this.dx = 0;
    this.dy = 0;
};

/**
* @method stops
* @brief the player dies
*/
Player.prototype.dies = function(){
    //We stop the player
    this.stops();

    //The score get back to 0
    this.score = 0;

    //Then we replace him at start
    this.setX(gameVars.initialPosition.x);
    this.setY(gameVars.initialPosition.y);
};

/**
* @method earnPoints
* @brief add points to the player's score
* @param the points to add
*/
Player.prototype.earnPoints = function(points){
    this.score += points;
}




/* ========================
* ITEM CLASS              /
* =========================
*/

/**
* @class Item
* @constructor
* @param {Integer} x : the x location of the item
* @param {Integer} y : the y location of the item
* @param {String} sprite : the Item's sprite
*/
var Item = function(x, y, sprite) {
    var that = this;

    // Inheritance from MapItem
    MapItem.call(this, x, y, sprite);

    /**
    * A boolean to know if an item is collected
    * @property out
    * @type Boolean
    * @default false
    */
    this.collected = false;

    //the player has between 3 and 8 seconds to collect an item
    setTimeout(function(){
        that.collected = true;
    }, Math.round((Math.random() * 8000) + 3000 ));
};

//Prototype chain
Item.prototype = Object.create(MapItem.prototype);
Item.prototype.constructor = Item;


/**
* @method isCollected
* @brief is the item collected ?
* @return TRUE if the item is collected, else FALSE
*/
Item.prototype.isCollected = function(){
    return this.collected;
};


/**
* @methode getValue
* @brief get the value of the Item
* @return an Integer
*/
Item.prototype.getValue = function(){
    if(this.sprite == 'images/gem-blue.png'){
        return Math.round((Math.random() * 400) + 300);
    }

    if(this.sprite == 'images/gem-green.png'){
        return Math.round((Math.random() * 800) + 500);
    }

    if(this.sprite == 'images/gem-orange.png'){
        return Math.round((Math.random() * 1000) + 800);
    }
}