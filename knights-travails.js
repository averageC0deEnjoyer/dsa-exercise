
class Node{
    constructor(coords, step = 0, parent){
        [this.currentCoordX, this.currentCoordY] = [...coords];
        this.parent = parent;
        this.step = step;

    }
}


function knightMoves(startCoordinates,endCoordinates){
    let [endCoordinateX, endCoordinateY] = [...endCoordinates];
    let visitedCoordinatesArray = [];
    let queueArray = []
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
    queueArray.push(new Node(startCoordinates, 0));
    visitedCoordinatesArray.push(startCoordinates); // to check if a coordinates already visited or not.
    while(queueArray.length > 0){
        let visitedNode = queueArray.shift();


        if(visitedNode.currentCoordX == endCoordinateX && visitedNode.currentCoordY == endCoordinateY)
        {return [visitedNode.step, visitedNode.parent]}     
        
        for(dir of possibleKnightMoves){
            let nextMoveCoords = [visitedNode.currentCoordX+dir[0],visitedNode.currentCoordY+dir[1]];
            if(nextMoveCoords[0] < -2 || nextMoveCoords[1] < -2 || nextMoveCoords[0] > m || nextMoveCoords[1] > n){continue}  
            if(visitedCoordinatesArray.some(arr=> arr.toString() === nextMoveCoords.toString())){continue}; //if visitedCoordinatesArray, continue loop
            queueArray.push(new Node(nextMoveCoords, visitedNode.step + 1, visitedNode));
            }
        }   
    }

//the big idea is, first initialize the queue by adding startingCoords to queue, add also startingCoords to visited.
//then check if the visitedCoordinates is the endCoordinates or not.
//after that, if nextCoords not visited and nextCoords not out of bound, push newNode with nextCoords argument to queue, step+1
//


console.log(knightMoves([0,0],[3,3]))
