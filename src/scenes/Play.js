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
        const map2 = this.add.tilemap('tilemapJSON');

        const tileset2 = map2.addTilesetImage('RearWindowTileSheet(32x32)', 'tilesetImage');
        const tileset = map.addTilesetImage('RearWindowTileSheet(32x32)', 'tilesetImage');
      
        const firstLayer = map.createLayer('firstLayer', tileset, 0, 0);
        const firstLayer2 = map2.createLayer('firstLayer', tileset2, 320, 0);

        this.weightArr = new Array();
        this.complete = false;


        map2.fill(-1, 0 , 0 , 10 , 10, true, firstLayer2);

        this.counter = 0;


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
        //  i.  Observation:
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

        this.rules = this.iterateOverMap(map, firstLayer);
        console.log(this.rules)


        // step 2: Create an array with the dimensions of the output.
        //      Each element of this array represents a state of an NxN region in the output. 
        //      A state of an NxN region is a superposition of NxN patterns of the input with boolean coefficients 
        //      (so a state of a pixel in the output is a superposition of input colors with real coefficients).
        //      False coefficient means that the corresponding pattern is forbidden,
        //      true coefficient means that the corresponding pattern is not yet forbidden.

        
        // while(!this.complete){
            var tileCounter = 0;

            this.weightMap = new Array(map.height);
            for (var i = 0; i < map.height; i++) {
                this.weightMap[i] = new Array(map.width); 
                for(var j = 0; j < map.width; j++){

                    //step 3: Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.

                    this.weightMap[i][j] = {weights: new Array(...this.weightArr), collapsed: false, x: j, y: i, tileIndex: null};
                }
            }

            console.log(this.weightMap);
        
            //step 4: Repeat the following steps:New
            //  i.  Observation:
            //      A: Find a wave element with the minimal nonzero entropy. 
            //      If there is no such elements (if all elements have zero or undefined entropy) 
            //      then break the cycle (4) and go to step (5).
            //
            //      B: Collapse this element into a definite state according to its coefficients 
            //      and the distribution of NxN patterns in the input.
            //
            //  ii. Propogation:
            //      A: Propagation: propagate information gained on the previous observation step.

            for(let x = 0; x < 100; x++){
                var lowEntrop = this.findLowestEntropy(this.weightMap);
                if(lowEntrop.collapsed == true){
                    console.log('broken');
                    break;
                }
                tileCounter++;
                this.collapse(lowEntrop);
                // map2.putTileAt(lowEntrop.tileIndex, lowEntrop.x, lowEntrop.y, true, firstLayer2);
                if(lowEntrop.tileIndex){
                    map2.putTileAt(lowEntrop.tileIndex, lowEntrop.x, lowEntrop.y, true, firstLayer2);
                }
                else {
                    console.error('placing invalid index', lowEntrop.tileIndex, lowEntrop.x, lowEntrop.y);
                }
            }

            if(tileCounter == map.width * map.height){
                this.complete = true;
                console.log('complete');
            }
        }
        
        //step 5: By now all the wave elements are either in a completely observed state 
        //      (all the coefficients except one being zero) or in the contradictory state 
        //      (all the coefficients being zero). In the first case return the output. 
        //      In the second case finish the work without returning anything.



    // }




    findLowestEntropy(newMap){
        var lowestEntropy = newMap[0][0];
        for(let row = 0; row < newMap.length; row++){
            for(let col = 0; col < newMap[row].length; col++){
                if(!(newMap[row][col].collapsed) && (newMap[row][col].weights.length > 0) && (newMap[row][col].weights.length <= lowestEntropy.weights.length)){
                    
                    //console.log('row:', row, 'col:', col, 'newTile.len:', newMap[row][col].weights.length, 'lowEnt.len:', lowestEntropy.weights.length, 'is collapsed:', newMap[row][col].collapsed);

                    lowestEntropy = newMap[row][col];
                }
            }
        }

        this.counter++;
        console.log(this.counter);
        console.log("Lowest Entropy", lowestEntropy);
        return lowestEntropy;

    }

    
    collapse(tile){
        var selectedIndex = this.getRandomIndex(tile.weights);
        // console.log('tile: ')
        // console.log(tile);
        
        tile.collapsed = true;
        tile.tileIndex = selectedIndex;
        this.propagate(tile, this.weightMap);
        this.weights = [];
        //console.log(tile);
    }



    propagate(currTile, map){
        for(var i = 0; i < this.rules.length; i++){

            // if(map[currTile.x][currTile.y - 1] && !map[currTile.x][currTile.y - 1].collapsed){

            //     map[currTile.x][currTile.y - 1].weights = map[currTile.x][currTile.y-1].weights.filter((element, index, array, that) => {
            //         console.log(this.rules);
            //         console.log('----------------------------')
            //         return true //element.index == 286 && that.rules[i].direction == 'down'
            //     });
                
            // }
            if(map[currTile.x][currTile.y + 1] && !map[currTile.x][currTile.y + 1].collapsed){
                
                map[currTile.x][currTile.y + 1].weights = map[currTile.x][currTile.y + 1].weights.filter(element => element.index == 286);

            }

            if(map[currTile.x - 1] && !map[currTile.x - 1][currTile.y].collapsed){
                // console.log(map[currTile.x - 1][currTile.y]);
                // console.log(map[currTile.x - 1][currTile.y].weights)
                map[currTile.x - 1][currTile.y].weights = map[currTile.x - 1][currTile.y].weights.filter(element => element.index == 286);

            }

            if(map[currTile.x + 1] && !map[currTile.x + 1][currTile.y].collapsed){
                map[currTile.x + 1][currTile.y].weights = map[currTile.x + 1][currTile.y].weights.filter(element => element.index == 286);
            }

        }
            // map[currTile.x + 1][currTile.y].weights = [{index: 286, frequency: 1}];


        //for(var rule of this.rules){


            // if(currTile.weights.length <= 0){
            //     //up neighbor

            //     if(map[currTile.x][currTile.y-1] && !map[currTile.x][currTile.y-1].collapsed){
            //         map[currTile.x][currTile.y-1].weights = map[currTile.x][currTile.y-1].weights.filter(element => element.index == rule.index && currTile.index == rule.adjacentTileIndex && rule.direction == 'down');

            //     }

            //     //down neighbor

            //     if(map[currTile.x][currTile.y + 1] && !map[currTile.x][currTile.y+1].collapsed){
            //         map[currTile.x][currTile.y+1].weights = map[currTile.x][currTile.y+1].weights.filter(element => element.index == rule.index && currTile.index == rule.adjacentTileIndex && rule.direction == 'up');
            //     }

            //     //left neighbor

            //     if(map[currTile.x - 1] && !map[currTile.x - 1][currTile.y].collapsed){
            //         map[currTile.x - 1][currTile.y].weights = map[currTile.x - 1][currTile.y].weights.filter(element => element.index == rule.index && currTile.index == rule.adjacentTileIndex && rule.direction == 'right');
            //     }

            //     //right neighbor

            //     if(map[currTile.x + 1]  && !map[currTile.x + 1][currTile.y].collapsed){
            //         map[currTile.x + 1][currTile.y].weights = map[currTile.x + 1][currTile.y].weights.filter(element => element.index == rule.index && currTile.index == rule.adjacentTileIndex && rule.direction == 'left');
            //     }
            //     return;
            // }

            // for(var weight of currTile.weights){

            //     //up neighbor

            //     if(map[currTile.x][currTile.y-1]  && !map[currTile.x][currTile.y-1].collapsed){
            //         map[currTile.x][currTile.y-1].weights = map[currTile.x][currTile.y-1].weights.filter(element => element.index == rule.index && weight.index == rule.adjacentTileIndex && rule.direction == 'down');

            //     }

            //     //down neighbor

            //     if(map[currTile.x][currTile.y + 1] && !map[currTile.x][currTile.y+1].collapsed){
            //         map[currTile.x][currTile.y+1].weights = map[currTile.x][currTile.y+1].weights.filter(element => element.index == rule.index && weight.index == rule.adjacentTileIndex && rule.direction == 'up');
            //     }

            //     //left neighbor

            //     if(map[currTile.x - 1] && !map[currTile.x - 1][currTile.y].collapsed){
            //         map[currTile.x - 1][currTile.y].weights = map[currTile.x - 1][currTile.y].weights.filter(element => element.index == rule.index && weight.index == rule.adjacentTileIndex && rule.direction == 'right');
            //     }

            //     //right neighbor

            //     if(map[currTile.x + 1] && !map[currTile.x + 1][currTile.y].collapsed){
            //         map[currTile.x + 1][currTile.y].weights = map[currTile.x + 1][currTile.y].weights.filter(element => element.index == rule.index && weight.index == rule.adjacentTileIndex && rule.direction == 'left');
            //     }



            // }
        //}
    }
    





    iterateOverMap(tileMap, layer){
        var adjacencyRulesArray = [];
        var currTile;
        var results;
        var isIn = false;

        for(let y = 0; y < tileMap.height; y++){
            for(let x = 0; x < tileMap.width; x++){

                currTile = tileMap.getTileAt(x, y, true, layer);

                if(this.weightArr.length == 0){
                    this.weightArr.push({index: currTile.index, frequency: 0});
                } 

                isIn = false;
                for(let elem of this.weightArr){
                    if(elem.index == currTile.index){
                        elem.frequency += 1;
                        isIn = true;
                        break;
                    }
                }
                if(!isIn){
                    this.weightArr.push({index: currTile.index, frequency: 1});
                }

                var upTile = null;
                var downTile = null;
                var leftTile = null;
                var rightTile = null;

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
            (thing, index, self) => index === self.findIndex((t) => t.index === thing.index && t.adjacentTileIndex === thing.adjacentTileIndex && t.direction === thing.direction));
        

        return(results);
    }




    getRandomIndex(arrOfWeight){
        //gets an index from an array of objects that have properties index and frequency
        //the chance the object is returned is based on the frequency given
        var rand = (Math.floor(Math.random()*99))/100;
        var counter = 0;
        var totalFreq = 0;
        var foundIndex;
        if(arrOfWeight.length <= 0){
            console.error('Array length is 0, cannot get index');
            return undefined;
        }

        for(let x of arrOfWeight){
            if(x.frequency){
                totalFreq += x.frequency;
            }
        }

        for(let y of arrOfWeight){
            if(y.frequency){
                counter += y.frequency/totalFreq
                if(rand <= counter){
                    foundIndex = y.index;
                    break;
                }
            }
        }

        return foundIndex;
    }

}