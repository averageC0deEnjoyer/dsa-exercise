
class Node{
    constructor(coords){
        [this.currentCoordX, this.currentCoordY] = [...coords];
        this.child = [];
    }
}

function knightMoves(startCoordinates,endCoordinates){
    let [endCoordinateX, endCoordinateY] = [...endCoordinates];
    let step = 0;
    let visitedNodesArray = [];
    let queueArray = [];
    let possibleKnightMoves = [[1,2],[2,1],[2,-1],[1,-2],[-1,2],[-2,1],[-2,-1],[-1,-2]];

    let m = 8;
    let n = 8;
    let grid = [];
    
    
    for(let i = 0 ; i < m; i++){
        grid.push([]);
        for(let j = 0; j<n; j++){
            grid[i].push(0);
        }
    }
    
    //initialize queue (line 28 29)
    queueArray.push(new Node(startCoordinates));
    visitedNodesArray.push(startCoordinates); // to check if a coordinates already visited or not.
    while(queueArray.length > 0 && queueArray[0].currentCoordX != endCoordinateX && queueArray[0].currentCoordY != endCoordinateY){
    let visitedNode = queueArray.unshift();
    if(visitedNode.currentCoordX == endCoordinateX && visitedNode.currentCoordY == endCoordinateY){return step};     
        
        
        for(item of queueArray){
            let visitedNode = queueArray.unshift();
            visitedNodesArray.push([visitedNode.currentCoordX,visitedNode.currentCoordY]);
            for(dir of possibleKnightMoves){
                let nextMoveCoords = [visitedNode.currentCoordX+dir[0],visitedNode.currentCoordY+dir[1]];
                if(nextMoveCoords[0] < -2 || nextMoveCoords[1] < -2 || nextMoveCoords[0] > m || nextMoveCoords[1] > n){continue}  
                if(visitedNodesArray.some(arr=> arr.toString() === nextMoveCoords.toString())){continue}; //if visitedNodesArray, continue loop
                if(visitedNode.currentCoordX==endCoordinateX && visitedNode.currentCoordY==endCoordinateY){return step};
                queueArray.push(new Node(nextMoveCoords));
            }
        }
        step = step + 1
    }
    return step;
}

console.log(knightMoves([0,0],[1,2]))
