/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
   
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas element's height/width and add it to the DOM.
     */
    const doc = global.document;
    const canvas = doc.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let lastTime, isPlaying;
    
    canvas.width = map.dimensions.width;
    canvas.height = map.dimensions.height;
    doc.body.appendChild(canvas);
    

    /**
     * Invoca o método render das entidades
     */
    const renderEntities = () => {
        const renderAll = e => e.render();
        /**! É necessário que o map esteja na primeira opção */
        [map, ...allEnemies, player].forEach(renderAll);
    }


    /**
     * Checa as posições do player e dos inimigos para resetar quando acontecer colisão
     * 
     * @function checkCollisions
     * @return {void}
     */
    const checkCollisions = () => {
        const { x: startPlayerX, y: startPlayerY } = player;
        const endPlayerX = startPlayerX + 80;
        const endPlayerY = startPlayerY + 80;
        
        allEnemies.forEach(({x: startEnemyX, y: startEnemyY}) => {
            const endEnemyX = startEnemyX + 80;
            const endEnemyY = startEnemyY + 80;
            
            if((startPlayerX < endEnemyX && endPlayerX > startEnemyX) && (startPlayerY < endEnemyY && endPlayerY > startEnemyY))
                reset();
                
            if(startPlayerY < 50)
                 reset();

        })
    }


    /**
     * Atualiza as entidades
     * 
     * @param {number} dt - Valor randômico
     * @return {void}
     */
    const updateEntities = dt => {
        const updateEnemies = e => e.update(dt, map.dimensions.width);
        allEnemies.forEach(updateEnemies);   
        
        player.update();
    }


    /**
     * Atualiza as Entidades
     * 
     * @param {dt} dt - Valor randômico
     * @return {void}
     */
    const update = dt => {
        updateEntities(dt);
        checkCollisions();
    }


    /**
     * Adiciona inimigos nos devidos lugares do mapa
     * 
     * @param {Array.<Object>} mapRow Vetor com objetos que formam o cenário
     * @return {Array.<Enemy>}
     */
    const createEnemy  = mapRow => {
        let enemies = [];
        const getRandom = (max, min) => Math.floor(Math.random() * (max - min) ) + min;

        const addEnemies = ({type}, row) => {
            if(type === 'enemy') {
                const baseMove = getRandom(150, 75);
                const x = -getRandom(5, 50);              
                const y = (row * 83) - 17;
                const newEnemy = new Enemy(undefined, x, y, baseMove); 

                enemies.push(newEnemy);
            }
        }
        mapRow.forEach(addEnemies);   

        return enemies;
    }


    /**
     * Função utilizado para intermediar a inicialização e as atualizações
     * 
     * @function main
     * @return {void}
     */
    const main = () => {
        const now = Date.now();
        const dt = (now - lastTime) / 1000.0;
                
        update(dt);
        renderEntities();

        lastTime = now;

        if(isPlaying)
            window.requestAnimationFrame(main);            
    }


    /**
     * Função utilizada para resetar o jogo quando acontecer colisão ou quando o player alcançar a chegada
     * 
     * @function reset
     * @return {void}
     */
    const reset = () => {
        isPlaying = false;
        player.reset(...map.getPosStart());
        ctx.clearRect(0, 0, map.dimensions.width, map.dimensions.height);
        init();
    }


    /**
     * Método responsável por inicializar o mapa e o loop
     * 
     * @function init
     * @return {void}
     */
    const init = () => {
        map.init();
        allEnemies = createEnemy(map.getMap());
        lastTime = Date.now();
        isPlaying = true;
        renderEntities();
        main();
    }


    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
