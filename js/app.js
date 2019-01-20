const map = new Map();
const player = new Player(...map.getPosStart());
let allEnemies = [];

const watchKeyUp = e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    
    player.handleInput(allowedKeys[e.keyCode]);    
};
document.addEventListener('keyup', watchKeyUp);
