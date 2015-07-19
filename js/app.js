
/* ==========================
 * ENEMY CLASS              /
 * ==========================
 */
var Enemy = function(x, y) {

    // Inheritance from Character
    //Character.call(x, y);

    if(typeof x === 'undefined'){
        x = 0;
    }

    if(typeof y === 'undefined'){
        y = 0;
    }


    // location
    this.x = x;
    this.y = y;

    this.out = false; //is the enemy out of the map ?
    this.sprite = 'images/enemy-bug.png';

    //speed between 1 and 2
    this.speed = (Math.random() * 2) + 1;
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    setTimeout(Enemy.prototype.move(this), dt);
    this.out = (this.x === gameVars.limits.outx);
};

Enemy.prototype.move = function(obj){
    obj.x = obj.x + obj.speed;
}




/* ==========================
 * PLAYER CLASS             /
 * ==========================
 */
var Player = function(x, y) {

    // Inheritance from Character
    //Character.call(x, y);

    if(typeof x === 'undefined'){
        x = 0;
    }

    if(typeof y === 'undefined'){
        y = 0;
    }


    // location
    this.x = x;
    this.y = y;

    this.dx = 0;
    this.dy = 0;

    this.area = {
        'minx' : this.x - 50,
        'maxx' : this.x + 50,
        'miny' : this.y - 44.5,
        'maxy' : this.y + 44.5
    };


    this.sprite = 'images/char-boy.png';
};

// Inheritance of prototype
/*Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;*/

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    //update the player's area
    this.area.minx = this.x - 50;
    this.area.maxx = this.x + 50;
    this.area.miny = this.y - 44.5;
    this.area.maxy = this.y + 44.5;

    this.stops();
};

// Handle directions orders
Player.prototype.handleInput = function(direction){

    switch(direction) {
        case 'left':
            if(this.x === gameVars.limits.minx ){
                this.dx = 0
            } else {
                this.dx = gameVars.steps.left;
            }

            this.dy = 0;
            break;
        case 'right':
            if(this.x === gameVars.limits.maxx ){
                this.dx = 0
            } else {
                this.dx = gameVars.steps.right;
            }
            this.dy = 0;
            break;
        case 'up':
            // We won
            if(this.y === gameVars.limits.miny ){
                this.y = 382;
                this.dy = 0
                alert('Congratulations !');
            } else {
                this.dy = gameVars.steps.up;
            }
            this.dx = 0;
            break;
        case 'down':
            if(this.y === gameVars.limits.maxy ){
                this.dy = 0
            } else {
                this.dy = gameVars.steps.down;
            }
            this.dx = 0;
            break;
        default:
    }
};

// Stoping the player
Player.prototype.stops = function(){
    this.dx = 0;
    this.dy = 0;
}

// The player must DIE
Player.prototype.dies = function(){
    this.stops();
    this.x = gameVars.initialPosition.x;
    this.y = gameVars.initialPosition.y;
}



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



// NOTE FOR FURTHER DEV : 
// REPLACE keyup BY keydown FOR THE PREVIOUS EVENT
// AND COMMENT THE LINE this.stops() IN THE UPDATE FUNCTION
// TO HAVE A SMOOTH MOVEMENT
/*document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.stops();
});
*/


/* ==========================================
 * An object containing some global variables/
 * ==========================================
 */
 var gameVars = {
    'allEnemies' : [],
    'initialPosition' : {
        'x' : 201,
        'y' : 382
    },
    'player' : null,
    'limits' : {
        'minx' : 1,
        'miny' : 42,
        'maxx' : 401,
        'maxy' : 382,
        'outx' : 505
    },
    'steps' : {
        'left' : -100,
        'right' : 100,
        'up' : -85,
        'down' : 85
    },
    'ys_' : [127, 212, 297, 382],
    'lastYIndex' : null
 };

gameVars.player = new Player(gameVars.initialPosition.x, gameVars.initialPosition.y);