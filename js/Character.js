/**
 * Essa classe representa um character
 */
class Character {
    /**
     * Cria um character
     * 
     * @constructor
     * @param {String} sprite - Path do ícone
     * @param {Number} x - Posição inicial no eixo horizontal
     * @param {Number} y - Posição inicial no eixo vertical
     */
    constructor(sprite, x = 0, y = 0) {
        Object.assign(this, { sprite, x, y });
    }


    /**
     * Desenha um character no Canvas
     * 
     * @memberof Character
     * @method render
     * @returns {void}
     */
    render() {      
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}