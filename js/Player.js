/**
 * Essa classe representa um player
 */
class Player extends Character {
    /**
     * Cria um player
     * 
     * @constructor
     * @param {Number} x Posição inicial no eixo horizontal
     * @param {Number} y Posição inicial no eixo vertical
     * @param {Object} moves Valores usados para a movimentação do player
     * @param {Number} moves.left 
     * @param {Number} moves.right
     * @param {Number} moves.up
     * @param {Number} moves.down
     * @param {String} sprite Path do ícone
     */
    constructor(x = 0, y = 0, moves = { left: -101, right: 101, up: -83, down: 83 }, sprite = 'images/char-boy.png') {
        super(sprite, x, y);
        
        Object.assign(this, {
            x,
            y,
            moves
        });
    };

    
    /**
     * Atualiza a posição do player
     * 
     * @memberof Player
     * @method update
     * @param {Array} dt Valor da movimento do player
     * @returns {void}
     */
    update(x = this.x, y = this.y) {        
        const { clientHeight, clientWidth } = window.ctx.canvas;
        
        this.x = x < clientWidth && x >= 0 ? x : this.x;
        this.y = y + 110 < clientHeight  && y >= -31 ? y : this.y;
    };


    /**
     * Atualiza a posição do player de acordo com sua Input
     * 
     * @memberof Player
     * @method handleInput
     * @param {String} direction Direção do player 
     * @returns {void}
     */
    handleInput(direction) {   
        if(direction === 'left' || direction === 'right') {
            this.update(this.x + this.moves[direction], this.y);  
        }
        else {
            this.update(this.x, this.y + this.moves[direction]);                        
        }
    };


    /**
     * Resetar a posição do Player
     * 
     * @memberof Player
     * @method reset
     * @param {Number} x Ponto x
     * @param {Number} y Ponto y
     * @returns {void}
     */
    reset(x, y) {
        this.x = x;
        this.y = y;
    };
}