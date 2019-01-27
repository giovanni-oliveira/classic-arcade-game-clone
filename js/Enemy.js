/**
 * Essa classe representa um inimigo
 */
class Enemy extends Character {
    /**
     * Cria um inimigo
     * 
     * @constructor
     * @param {Number} x Posição inicial no eixo horizontal
     * @param {Number} y Posição inicial no eixo vertical
     * @param {Number} baseMove - Valor base para movimento
     * @param {String} sprite Path do ícone
     */ 
    constructor(x, y, baseMove = 50, sprite) {
        super(sprite = 'images/enemy-bug.png', x, y);
        
        Object.assign(this, { sprite, x, y, baseMove });
    };


    /**
     * Atualiza a posição dt * baseMove
     * 
     * @memberof Enemy
     * @method update
     * @param {number} dt Delta, número randômico para modificar a velocidade do Inimigo
     * @param {number} max Ponto x máximo da tela
     * @returns {void}
     */
    update(dt, max) {
        const random = (dt * this.baseMove);
        this.x = this.x > max ? -(this.baseMove + random) : this.x + random;       
    };
}