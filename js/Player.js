/**
 * Class representing a player
 */
class Player {
    /**
     * Create a player
     * @param {string} sprite - Path do ícone
     * @param {number} x - Posição inicial no eixo horizontal
     * @param {number} y - Posição inicial no eixo vertical
     * @param {object} moves - Valores usados para a movimentação do player
     */
    constructor(x = 0, y = 0, moves = { left: -101, right: 101, up: -83, down: 83 }, sprite = 'images/char-boy.png') {
        Object.assign(this, {
            sprite,
            x,
            y,
            moves
        });
    }

    
    /**
     * Atualiza a posição do player
     * 
     * @memberof Player
     * @method update
     * @param {Array} dt Valor da movimento do player
     * @return {void}
     */
    update(x = this.x, y = this.y) {        
        const { clientHeight, clientWidth } = ctx.canvas;
        
        this.x = x < clientWidth && x >= 0 ? x : this.x;
        this.y = y < (clientHeight - 157) && y >= -31 ? y : this.y;
    }


    /**
     * Atualiza a posição do player de acordo com sua Input
     * 
     * @memberof Player
     * @method handleInput
     * @param {string} dt Direção do player 
     * @return {void}
     */
    handleInput(dt) {
        if(dt === 'left' || dt === 'right')
            this.update(this.x + this.moves[dt], this.y);  
        else
            this.update(this.x, this.y + this.moves[dt]);                        
    }


    /**
     * Resetar a posição do Player
     * 
     * @memberof Player
     * @method reset
     * @param {Number} x Ponto x
     * @param {Number} y Ponto y
     * @return {void}
     */
    reset(x, y) {
        this.x = x;
        this.y = y;
    }


    /**
     * Desenha no Canvas um player
     * 
     * @memberof Player
     * @method render
     * @return {void}
     */
    render() {       
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}