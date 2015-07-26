
"use strict";
/* ======================
* OBJECTPUSHER PROTOTYPE /
* =======================
*/

/**
* @class ObjectPusher
* @constructor
* @param {Object} game : the game in which the ObjectPusher will make objects push
*/

var ObjectPusher = function(game){

    if(typeof game === 'undefined'){
        game = null;
    }

    /**
    * The game's reference
    * @property game
    * @type Object
    * @default null
    */
    this.game = game;

    /**
    * The pusher's lock, used in order to control Objects pushing
    * @property lock
    * @type Boolean
    * @default false
    */
    this.lock = false;

};

/**
* @method getGame
* @brief get the game's reference of the pusher
*/ 
ObjectPusher.prototype.getGame = function(){
    return this.game;
};

/**
* @method getLock
* @brief release the lock of the pusher
*/
ObjectPusher.prototype.releaseLock = function(){
    this.lock = false;
};



/**
* @method push
* @brief make an object push into the game
*/
ObjectPusher.prototype.push = function(that){
    if(!that.lock){
        that.lock = true;
        setTimeout(function(){
            that.insertNewRandomObject();
        }, (Math.random() * that.getMaxTimePush()) + that.getMinTimePush());
    }
};


/* =====================
* ENEMYPUSHER PROTOTYPE /
* ======================
*/

/**
* @class EnemyPusher
* @constructor
* @param {Object} game : the game in which the EnemyPusher will make enemies push
*/

var EnemyPusher = function(game){
    ObjectPusher.call(this, game);
};

//Inheritance of prototype
EnemyPusher.prototype = Object.create(ObjectPusher.prototype);
EnemyPusher.constructor = EnemyPusher;

/**
* @method insertNewRandomObject
* @brief insert a new random instance into the correct array of the game
*/
EnemyPusher.prototype.insertNewRandomObject = function(){
    var i;
    var game = this.getGame();
    while((i = Math.round((Math.random() * 3) + 0)) === game.lastYIndex);
    game.lastYIndex = i;
    game.allEnemies.push(new Enemy(0, game.YS_[i], 'images/enemy-bug.png'));
    this.releaseLock();
};

/**
* @method getMaxTimePush
* @brief get the max time it should take to create an enemy
* @return and {Integer}
*/
EnemyPusher.prototype.getMaxTimePush = function(){
    return 1200;
};

/**
* @method getMinTimePush
* @brief get the min time it should take to create an enemy
* @return and {Integer}
*/
EnemyPusher.prototype.getMinTimePush = function(){
    return 500;
};

/* =====================
* ITEMPUSHER PROTOTYPE /
* ======================
*/

/**
* @class ItemPusher
* @constructor
* @param {Object} game : the game in which the ItemPusher will make items push
*/

var ItemPusher = function(game){
    ObjectPusher.call(this, game);
};

//Inheritance of prototype
ItemPusher.prototype = Object.create(ObjectPusher.prototype);
ItemPusher.constructor = ItemPusher;

/**
* @method insertNewRandomObject
* @brief insert a new random instance into the correct array of the game
*/
ItemPusher.prototype.insertNewRandomObject = function(){
    var i, j, k;
    //We retrieve the game'e reference
    var game = this.getGame();

    //We generate a random index which is different from the previous for both X and Y axis
    while((i = Math.round((Math.random() * 3) + 0)) === game.lastYIndex 
            || (j = Math.round((Math.random() * 4) + 0)) === game.lastXIndex );
    game.lastYIndex = i;
    game.lastXIndex = j;

    //We do the same concerning the gems types
    while((k = Math.round((Math.random() * 2) + 0)) === game.lastGemIndex);

    game.lastGemIndex = k;

    //Then we push the new item
    game.allItems.push(new Item(game.XS_[j], game.YS_[i], game.GEMS[k]));

    //And we release the lock
    this.releaseLock();
};

/**
* @method getMaxTimePush
* @brief get the max time it should take to create an item
* @return and {Integer}
*/
ItemPusher.prototype.getMaxTimePush = function(){
    return 5000;
};

/**
* @method getMinTimePush
* @brief get the min time it should take to create an item
* @return and {Integer}
*/
ItemPusher.prototype.getMinTimePush = function(){
    return 2000;
};