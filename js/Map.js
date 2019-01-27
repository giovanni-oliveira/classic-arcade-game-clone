/**
 * Essa classe representa um Map
 */
class Map {
    /**
     * Cria um map
     * 
     * @constructor
     * @param {Object} rowImages Objeto contendo Path e tipo do mapa
     * @param {Object} rowImages.x
     * @param {String} rowImages.x.rowImage Path da imagem 
     * @param {String} rowImages.x.type Tipo da imagem
     * @param {Object} dimensions Objeto contendo informações sobre o mapa, os dados servirão para gerar o mapa randomicamente
     * @param {Number} dimensions.sizeRow Tamanho da linha
     * @param {Number} dimensions.sizeCol Tamanho da coluna
     * @param {Number} dimensions.numCols Quantidade de colunas
     * @param {Number} dimensions.numRows Quantidade de linhas
     * @param {Number} minEnemies Número mínimo de inimigos suportados no mapa
     * @param {Number} score Pontuação do jogador
     */
    constructor(rowImages, dimensions = { sizeRow: 83, sizeCol: 101, numCols: 5, numRows: 9 }, minEnemies = 5, score = 0) {
        rowImages = rowImages || {
            water: { rowImage: 'images/water-block.png', type: 'arrival' },
            stone: { rowImage: 'images/stone-block.png', type: 'enemy' },
            grass: { rowImage: 'images/grass-block.png', type: 'ally' }
        };      
        const posStartX = Math.floor(dimensions.numCols / 2) * dimensions.sizeCol;
        const postStartY = ((dimensions.numRows - 1) * 83) - 17;
        dimensions.height = (dimensions.numRows * dimensions.sizeCol) - 74;
        dimensions.width = dimensions.numCols * dimensions.sizeCol;

        Object.assign(this, { rowImages, dimensions, minEnemies, posStartX, postStartY, score });
    }


    /**
     * Cria o mapa randomizado
     * 
     * @memberof Map
     * @method createMap
     * @returns {array} Vetor contento as imagens do cenário randomizadas
     */
    createMap() {
        /** A primeira posição do mapa sempre será a água representando o objetivo */
        const map = [this.rowImages.water];
        const middleMaps = [this.rowImages.grass, this.rowImages.stone];
        const numMiddleMap = this.dimensions.numRows - 2;
        const max = middleMaps.length;
        
        if(this.minEnemies > numMiddleMap) {
            throw 'Impossível gerar o mapa';
        }

        const randomNumber = max => Math.floor(Math.random() * max);
        const randomMapNumber = (size, numOptions) => {
            const randomizedMap = [];
            for (let i = 0; i < size; i++) {
                randomizedMap.push(randomNumber(numOptions));
            }

            return randomizedMap;
        };
        
        let mapApproved = false;
        let randomizedMap = [];
        while(mapApproved === false) {
            randomizedMap = randomMapNumber(numMiddleMap, max);
            const countEnemies = (total, value) => value === 1 ? total + 1 : total
            const total = randomizedMap.reduce(countEnemies, 0);
            
            if( total >= this.minEnemies) {
                mapApproved = true;
            }
        }

        randomizedMap.forEach(num => map.push(middleMaps[num]));
        
        /** A última posição sempre será a grama representando o ponto inicial */
        map.push(this.rowImages.grass);
        
        return map;
    }


    /**
     * Renderiza a entidade Map
     * 
     * @memberof Map
     * @method render
     * @returns {void}
     */
    render() {
        const {width, height, numRows, numCols, sizeRow, sizeCol} = this.dimensions;

        ctx.clearRect(0, 0, width, height);

        const positionImage = (row, col) => [
            Resources.get(this.map[row].rowImage),
            col * sizeCol,
            row * sizeRow
        ];

        for (let row = 0; row < numRows; row++) {            
            for (let col = 0; col < numCols; col++) {
                ctx.drawImage(...positionImage(row, col));
            }
        }

        this.renderScore();
    }

    
    /**
     * Retorna o array do cenário ou erro que o mapa não foi criado
     * 
     * @memberof Map
     * @method getMap
     * @returns {array} Cenário do jogo
     */
    getMap() {
        if(this.map) {
            return this.map;
        } else {
            throw "Map not created";
        }
    }
    

    /**
     * Retorna a posição inicial do Player
     * 
     * @memberof Map
     * @method getPosStart
     * @returns {Array.<Number>}
     */
    getPosStart() {      
        return [this.posStartX, this.postStartY]
    }


    /**
     * Renderiza o score do jogador
     * 
     * @memberof Map
     * @method renderScore
     * @returns {void}
     */
    renderScore() {
        ctx.fillStyle = "black";
        ctx.font = "30px Permanent Marker";
        ctx.fillText(`SCORE: ${this.score}`, 10, 35);
    }


    /**
     * Retorna o valor do score
     * 
     * @memberof Map
     * @method getScore
     * @returns {number}
     */
    getScore() {
        return this.score;
    }


    /**
     * Reinicia o score do jogo
     * 
     * @memberof Map
     * @method resetScore
     * @returns {void}
     */
    resetScore() {
        this.score = 0;
    }


    /**
     * Acrescenta o score do jogador
     * 
     * @memberof Map
     * @method increaseScore
     * @param {number} [score=1] Número que será incrementado no score
     * @returns {void}
     */
    increaseScore(score = 1) {
        this.score += score;    
    }


    /**
     * Método responsável por iniciar o mapa
     * 
     * @memberof Map
     * @method init
     * @returns {void}
     */
    init() {      
        this.map = this.createMap();
        this.render();       
    }
}