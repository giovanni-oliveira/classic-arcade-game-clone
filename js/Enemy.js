/**
 * Class representing an enemy
 */
class Enemy {
    /**
     * Create a enemy
     * 
     * @param {String} sprite Path do ícone
     * @param {Number} x Posição inicial no eixo horizontal
     * @param {Number} y Posição inicial no eixo vertical
     * @param {Number} baseMove - Valor base para movimento
     */ 
    constructor(sprite = 'images/enemy-bug.png', x = 0, y = 0, baseMove = 50) {
        Object.assign(this, {
            sprite,
            x,
            y,
            baseMove
        });
    };


    /**
     * Atualiza a posição dt * baseMove
     * 
     * @memberof Enemy
     * @method update
     * @param {number} dt Delta, número randômico para modificar a velocidade do Inimigo
     * @returns {void}
     */
    update(dt, max) {
        const random = (dt * this.baseMove);
        this.x = this.x > max ? -(this.baseMove + random) : this.x + random;       
    };


    /**
     * Desenha no Canvas um enemy
     * 
     * @memberof Enemy
     * @method render
     * @returns {void}
     */
    render() {      
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}