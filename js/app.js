"use strict";
/* ==========================
 * CHARACTER CLASS          /
 * ==========================
 */

/**
* @class Character
* @constructor
* @param {Integer} x : the x location of the character
* @param {Integer} y : the y location of the character
* @param {String} sprite : the picture of the character
*/
var Character = function(x, y, sprite){

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
* @brief get the Character's x location
* @return {Integer} x, the Character's x location
*/
Character.prototype.getX = function(){
    return this.x;
};


/**
* @method getY
* @brief get the Character's y location
* @return {Integer} y, the Character's y location
*/
Character.prototype.getY = function(){
    return this.y;
};

/**
* @method setX
* @brief set the Character's x location
* @param {Integer} x, the new Character's x location
*/
Character.prototype.setX = function(x){
    this.x = x;
};

/**
* @method setY
* @brief set the Character's y location
* @param {Integer} y, the new Character's y location
*/
Character.prototype.setY = function(y){
    this.y = y;
};

/**
* @method render
* @brief render the Character
*/
Character.prototype.render = function() {
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
* @param {String} sprite : the Character's sprite
*/
var Enemy = function(x, y, sprite) {

    // Inheritance from Character
    Character.call(this, x, y, sprite);

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
Enemy.prototype = Object.create(Character.prototype);
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
    this.out = (this.getX() === gameVars.LIMITS.outx);
};



/* ==========================
* PLAYER CLASS             /
* ==========================
*/
/**
* @class Player
* @constructor
* @param {Integer} x : the x location of the character
* @param {Integer} y : the y location of the character
* @param {String} sprite : the Character's sprite
*/
var Player = function(x, y, sprite) {

    // Inheritance from Character
    Character.call(this, x, y, sprite);

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

};

// Inheritance of prototype
Player.prototype = Object.create(Character.prototype);
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
                this.y = 382;
                this.dy = 0;
                alert('Congratulations !');
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

    //Then we replace him at start
    this.setX(gameVars.initialPosition.x);
    this.setY(gameVars.initialPosition.y);
};



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    gameVars.player.handleInput(allowedKeys[e.keyCode]);
});


/* ==========================================
* An object containing some global variables/
* ==========================================
*/
var gameVars = {
    //all the enemies
    'allEnemies' : [],

    //the player's initial position
    'initialPosition' : {
        'x' : 201,
        'y' : 382   
    },

    //the player unique instance
    'player' : null,

    //the map's limits
    'LIMITS' : {
        'minx' : 1,
        'miny' : 42,
        'maxx' : 401,
        'maxy' : 382,
        'outx' : 505
    },

    //the steps the player can do
    'STEPS' : {
        'left' : -100,
        'right' : 100,
        'up' : -85,
        'down' : 85
    },

    //the various Y coordinates an enemy can pop
    'YS_' : [127, 212, 297, 382],

    //the last Y coordinate an enemy has pop
    'lastYIndex' : null
};

gameVars.player = new Player(gameVars.initialPosition.x, gameVars.initialPosition.y, 'images/char-boy.png');