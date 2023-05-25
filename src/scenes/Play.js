class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }
    preload(){
        this.load.image('tilesetImage', './assets/RearWindowTileSheet(32x32).png');
        this.load.tilemapTiledJSON('tilemapJSON', './assets/testMap.json');

    }

    create(){
        const map = this.add.tilemap('tilemapJSON');

        const tileset = map.addTilesetImage('RearWindowTileSheet(32x32)', 'tilesetImage');
      

        const firstLayer = map.createLayer('firstLayer', tileset, 0, 0);

        // const secondLayer = map.createLayer('testLayer', tileset, 0, 0);


        // useful functions for tilemap manipulation https://photonstorm.github.io/phaser3-docs/Phaser.Tilemaps.Tilemap.html

        // fill(index [, tileX] [, tileY] [, width] [, height] [, recalculateFaces] [, layer])
        // map.fill(0, 5, 0, 4, 1, true, firstLayer);

        // putTileAt(tile, tileX, tileY [, recalculateFaces] [, layer])
        // map.putTileAt(258, 5, 5, true, firstLayer);

        // putTilesAt(tile, tileX, tileY [, recalculateFaces] [, layer])
        // map.putTilesAt([[159, 159, 158],[159, 159, 158]], 0, 0, true, firstLayer);

        // getTileAt(tileX, tileY [, nonNull] [, layer])
        // map.getTileAt(0, 0, false, firstLayer).index;

        // getTilesWithin( [tileX] [, tileY] [, width] [, height] [, filteringOptions] [, layer])
        // map.getTilesWithin(0, 0, 3, 3, firstLayer);

        // hasTileAt(tileX, tileY [, layer])
        // map.hasTileAt(0, 0, firstLayer);

        // removeTileAt(tileX, tileY [, replaceWithNull] [, recalculateFaces] [, layer])
        // map.removeTileAt(0, 0, true, true, firstLayer);

        // removeLayer( [layer])
        // map.removeLayer(secondLayer);

        // destroyLayer( [layer])
        // map.destroyLayer(firstLayer);







        //              Wave Function Collapse Agorithm by: mxgmn https://github.com/mxgmn/WaveFunctionCollapse

        // step 1: Read the input bitmap and count NxN patterns.

        // step 2: Create an array with the dimensions of the output.
        //      Each element of this array represents a state of an NxN region in the output. 
        //      A state of an NxN region is a superposition of NxN patterns of the input with boolean coefficients 
        //      (so a state of a pixel in the output is a superposition of input colors with real coefficients).
        //      False coefficient means that the corresponding pattern is forbidden,
        //      true coefficient means that the corresponding pattern is not yet forbidden.

        //step 3: Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.

        //step 4: Repeat the following steps:
        //  i. Observation:
        //      A: Find a wave element with the minimal nonzero entropy. 
        //      If there is no such elements (if all elements have zero or undefined entropy) 
        //      then break the cycle (4) and go to step (5).
        //
        //      B: Collapse this element into a definite state according to its coefficients 
        //      and the distribution of NxN patterns in the input.
        //
        //  ii. Propogation:
        //      A: Propagation: propagate information gained on the previous observation step.
        
        //step 5: By now all the wave elements are either in a completely observed state 
        //      (all the coefficients except one being zero) or in the contradictory state 
        //      (all the coefficients being zero). In the first case return the output. 
        //      In the second case finish the work without returning anything.




        // custom implementation for phaser

        // step 1: Read the input bitmap and count NxN patterns.

        let rules = this.getRules(map, firstLayer);
        console.log(rules);


        // step 2: Create an array with the dimensions of the output.
        //      Each element of this array represents a state of an NxN region in the output. 
        //      A state of an NxN region is a superposition of NxN patterns of the input with boolean coefficients 
        //      (so a state of a pixel in the output is a superposition of input colors with real coefficients).
        //      False coefficient means that the corresponding pattern is forbidden,
        //      true coefficient means that the corresponding pattern is not yet forbidden.

        











        //step 3: Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.

        //step 4: Repeat the following steps:
        //  i. Observation:
        //      A: Find a wave element with the minimal nonzero entropy. 
        //      If there is no such elements (if all elements have zero or undefined entropy) 
        //      then break the cycle (4) and go to step (5).
        //
        //      B: Collapse this element into a definite state according to its coefficients 
        //      and the distribution of NxN patterns in the input.
        //
        //  ii. Propogation:
        //      A: Propagation: propagate information gained on the previous observation step.
        
        //step 5: By now all the wave elements are either in a completely observed state 
        //      (all the coefficients except one being zero) or in the contradictory state 
        //      (all the coefficients being zero). In the first case return the output. 
        //      In the second case finish the work without returning anything.



    }

    update(){

    }

    getRules(tileMap, layer){
        let adjacencyRulesArray = [];
        let currTile;
        let results;

        for(let y = 0; y < tileMap.height; y++){
            for(let x = 0; x < tileMap.width; x++){

                currTile = tileMap.getTileAt(x, y, true, layer)

                let upTile = null;
                let downTile = null;
                let leftTile = null;
                let rightTile = null;

                if(currTile.y > 0){

                    upTile = tileMap.getTileAt(x, y - 1, true, layer);
                    adjacencyRulesArray.push({index: currTile.index, adjacentTileIndex: upTile.index, direction: 'up'});
                }

                if(currTile.y < tileMap.height - 1){

                    downTile = tileMap.getTileAt(x, y + 1, true, layer);
                    adjacencyRulesArray.push({index: currTile.index, adjacentTileIndex: downTile.index, direction: 'down'});
                }

                if(currTile.x > 0){

                    leftTile = tileMap.getTileAt(x - 1, y, true, layer);
                    adjacencyRulesArray.push({index: currTile.index, adjacentTileIndex: leftTile.index, direction: 'left'});
                }

                if(currTile.x < tileMap.width - 1){

                    rightTile = tileMap.getTileAt(x + 1, y, true, layer);
                    adjacencyRulesArray.push({index: currTile.index, adjacentTileIndex: rightTile.index, direction: 'right'});
                }

            }
        }


        //get rid of duplicate rules
        results = adjacencyRulesArray.filter(
            (thing, index, self) =>
            index === self.findIndex((t) => t.index === thing.index && t.adjacentTileIndex === thing.adjacentTileIndex && t.direction === thing.direction)
            );
        return(results);
    }
}