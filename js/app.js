/* ==========================
 * SUPERCLASS CHARACTER     /
 * ==========================
 */
/*var Character = function(x, y){

    if(typeof x === 'undefined'){
        x = 0;
    }

    if(typeof y === 'undefined'){
        y = 0;
    }


    // location
    this.x = x;
    this.y = y;

};

// Draw the character on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/




/* ==========================
 * SUBCLASS ENEMY           /
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
    this.sprite = 'images/enemy-bug.png';
};

// Inheritance of prototype
/*Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;*/

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    setTimeout(Enemy.prototype.move(this), dt);
};

Enemy.prototype.move = function(obj){
    obj.x++;
}

Enemy.prototype.die = function(){
    delete this;
}



/* ==========================
 * SUBCLASS PLAYER          /
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
};

// Handle directions orders
Player.prototype.handleInput = function(direction){
    switch(direction) {
        case 'left':
            this.dx = -5;
            this.dy = 0;
            break;
        case 'right':
            this.dx = 5;
            this.dy = 0;
            break;
        case 'up':
            this.dy = -6;
            this.dx = 0;
            break;
        case 'down':
            this.dy = 6;
            this.dx = 0;
            break;
        default:
    }
};

// Stoping the player
Player.prototype.stop = function(){
    this.dx = 0;
    this.dy = 0;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(3,6), new Enemy(5,4)];
var player = new Player(0,0);


// Global function wich generates a random number of enemies and push them into an array
function generateEnemies(allEnemies){
    var nb = Math.floor((Math.random() * 10) + 1);
    for(var i=0; i<nb; i++){

    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.stop();
});
