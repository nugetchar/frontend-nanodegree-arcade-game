'use strict';
/* ======================
 * OBJECTPOPER PROTOTYPE /
 * =======================
 */

/**
 * @class ObjectPoper
 * @constructor
 * @param {Object} game : the game in which the ObjectPoper will make objects pop
 */

var ObjectPoper = function(game) {

    if (typeof game === 'undefined') {
        game = null;
    }

    /**
     * The game's reference
     * @property game
     * @type Object
     * @default null
     */
    this.game = game;
};

/**
 * @method getGame
 * @brief get the game's reference of the poper
 */
ObjectPoper.prototype.getGame = function() {
    return this.game;
};


/**
 * @method pop
 * @brief make an object pop into the game
 */
ObjectPoper.prototype.pop = function(that) {
    var array = that.getCorrectArray(); //we retrieve the correct array
    for (var i = 0; i < array.length; ++i) {
        if (that.canBePoped(array[i])) {
            delete array[i];
            array.splice(i, 1);
        }
    }
};



/* =====================
 * ENEMYPOPER PROTOTYPE /
 * ======================
 */

/**
 * @class EnemyPoper
 * @constructor
 * @param {Object} game : the game in which the EnemyPoper will make enemies pop
 */

var EnemyPoper = function(game) {
    ObjectPoper.call(this, game);
};

//Inheritance of prototype
EnemyPoper.prototype = Object.create(ObjectPoper.prototype);
EnemyPoper.constructor = EnemyPoper;


/**
 * @method getCorrectArray
 * @return the enemies array of the game
 */
EnemyPoper.prototype.getCorrectArray = function() {
    return this.getGame().allEnemies;
};


/**
 * @method canBePoped
 * @param enemy : the enemy we want to pop
 * @return TRUE if the enemy can be poped, else FALSE
 */
EnemyPoper.prototype.canBePoped = function(enemy) {
    return enemy.isOut();
};




/* =====================
 * ITEMPOPER PROTOTYPE /
 * ======================
 */

/**
 * @class ItemPoper
 * @constructor
 * @param {Object} game : the game in which the ItemPoper will make items pop
 */

var ItemPoper = function(game) {
    ObjectPoper.call(this, game);
};

//Inheritance of prototype
ItemPoper.prototype = Object.create(ObjectPoper.prototype);
ItemPoper.constructor = ItemPoper;

/**
 * @method getCorrectArray
 * @return the items array of the game
 */
ItemPoper.prototype.getCorrectArray = function() {
    return this.getGame().allItems;
};


/**
 * @method canBePoped
 * @param item : the item we want to pop
 * @return TRUE if the item can be poped, else FALSE
 */
ItemPoper.prototype.canBePoped = function(item) {
    return item.isCollected();
};