"use strict";
/* ==========================================
* An object containing some global variables/
* ==========================================
*/
var gameVars = {
    //all the enemies
    'allEnemies' : [],

    //all the items
    'allItems' : [],

    //the player's initial position
    'initialPosition' : {
        'x' : 201,
        'y' : 382   
    },

    //the player's unique instance
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

    //the various Y coordinates an enemy or an item can pop
    'YS_' : [42, 127, 212, 297],

    //the various X coordinates an enemy or an item can pop
    'XS_' : [1, 101, 201, 301, 401],

    //the last Y coordinate an enemy or an item has poped
    'lastYIndex' : null,

    //the last X coordinate an enemy or an item has poped
    'lastXIndex' : null,

    //the game's pushers
    'pushers' : [],

    //the game's popers
    'popers' : [],

    //the game's gems
    'GEMS' : ['images/gem-blue.png', 'images/gem-orange.png', 'images/gem-green.png'],

    //the last gem generated
    'lastGemIndex' : null,

    /**
    * @method startPushers
    * @brief for each game's pusher, launch its pushing operation
    */
    startPushers : function(){
        this.pushers.forEach(function(pusher) {
            pusher.push(pusher);
        });
    },

    /**
    * @method startPopers
    * @brief for each game's poper, launch its poping operation
    */
    startPopers : function(){
        this.popers.forEach(function(poper) {
            poper.pop(poper);
        });
    }
};

//adding new pushers
gameVars.pushers.push(new EnemyPusher(gameVars));
gameVars.pushers.push(new ItemPusher(gameVars));

//adding new popers
gameVars.popers.push(new EnemyPoper(gameVars));
gameVars.popers.push(new ItemPoper(gameVars));

gameVars.player = new Player(gameVars.initialPosition.x, gameVars.initialPosition.y, 'images/char-boy.png');

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
