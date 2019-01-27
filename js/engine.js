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
    let lastTime, idMainAnimation, isPlaying;
    
    canvas.width = map.dimensions.width;
    canvas.height = map.dimensions.height;
    
    doc.body.appendChild(canvas);
    

    if(map instanceof Map === false || player instanceof Player === false) 
        throw 'Crie instâncias válidas de Map e Player';


    /**
     * Invoca o método render das entidades
     * 
     * @function renderEntities
     * @returns {void}
     */
    const renderEntities = () => {
        const renderAll = e => e.render();
        /**! É necessário que o map esteja na primeira opção */
        [map, ...allEnemies, player].forEach(renderAll);
        canvas.background = 'red';
    };


    /**
     * Checa as posições do player e dos inimigos para resetar quando acontecer a colisão
     * 
     * @function checkCollisions
     * @returns {void}
     */
    const checkCollisions = () => {
        const { x: startPlayerX, y: startPlayerY } = player;
        const endPlayerX = startPlayerX + 80;
        const endPlayerY = startPlayerY + 80;
        
        allEnemies.forEach(({x: startEnemyX, y: startEnemyY}) => {
            const endEnemyX = startEnemyX + 80;
            const endEnemyY = startEnemyY + 80;
            
            if((startPlayerX < endEnemyX && endPlayerX > startEnemyX) && (startPlayerY < endEnemyY && endPlayerY > startEnemyY)) {
                map.resetScore();
                reset();
            }
                
            if(startPlayerY < 50 && isPlaying) {
                map.increaseScore();
                reset();
            }

        })
    };


    /**
     * Atualiza as entidades
     * 
     * @function updateEntities
     * @param {number} dt - Valor randômico
     * @returns {void}
     */
    const updateEntities = dt => {
        const updateEnemies = e => e.update(dt, map.dimensions.width);
        allEnemies.forEach(updateEnemies);   
        
        player.update();
    };


    /**
     * Atualiza as Entidades
     * 
     * @function update
     * @param {dt} dt - Valor randômico
     * @returns {void}
     */
    const update = dt => {
        updateEntities(dt);
        checkCollisions();
    };


    /**
     * Adiciona inimigos nos devidos lugares do mapa. As posiçções dos inimigos serão randomizadas,
     * tanto a y quanto x. x sempre iniciará negativamente
     * 
     * @function createEnemies
     * @param {Array.<Object>} mapRow Vetor com objetos que formam o cenário
     * @returns {Array.<Enemy>}
     */
    const createEnemies  = mapRow => {
        let enemies = [];
        const getRandom = (max, min) => Math.floor(Math.random() * (max - min) ) + min;

        const addEnemies = ({ type }, row) => {
            if(type === 'enemy') {
                const baseMove = getRandom(200, 75) + (map.getScore() * 4);
                const x = -getRandom(50, 20);              
                const y = (row * 83) - 17;
                const newEnemy = new Enemy(x, y, baseMove); 

                enemies.push(newEnemy);
            }
        }
        mapRow.forEach(addEnemies);   

        return enemies;
    };


    /**
     * Função utilizado para intermediar a inicialização e as atualizações
     * 
     * @function main
     * @returns {void}
     */
    const main = () => {
        const now = Date.now();
        const dt = (now - lastTime) / 1000.0;
        
        lastTime = now;
        
        if(isPlaying) {
            update(dt);
            renderEntities();
            idMainAnimation = window.requestAnimationFrame(main);            
        }
    };


    /**
     * Função utilizada para resetar o jogo quando acontecer colisão ou quando o player alcançar a chegada
     * 
     * @function reset
     * @returns {void}
     */
    const reset = () => {
        isPlaying = false;
        window.cancelAnimationFrame(idMainAnimation);
        
        setTimeout(function() {
            window.requestAnimationFrame(() => {
                player.reset(...map.getPosStart());
                ctx.clearRect(0, 0, map.dimensions.width, map.dimensions.height);
                init();
            });
        }, 200);
    };


    /**
     * Método responsável por inicializar o mapa e o loop
     * 
     * @function init
     * @returns {void}
     */
    const init = () => {
        map.init();
        allEnemies = createEnemies(map.getMap());
        lastTime = Date.now();
        isPlaying = true;
        renderEntities();
        main();
    };


    /**
     * Carrega a fonte e as imagens necessárias para iniciar o jogo
     * 
     * @async
     * @function startEngine
     * @return {void}
     */
    async function startEngine() {
        const font = new FontFace('Permanent Marker', 'url(https://fonts.gstatic.com/s/permanentmarker/v7/Fh4uPib9Iyv2ucM6pGQMWimMp004La2Cfw.woff2)');
        await font.load();
        document.fonts.add(font);

        Resources.load([
            'images/stone-block.png',
            'images/water-block.png',
            'images/grass-block.png',
            'images/enemy-bug.png',
            'images/char-boy.png'
        ]);
        Resources.onReady(init);
    }


    startEngine();

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
