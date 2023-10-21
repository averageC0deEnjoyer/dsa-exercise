let m = 8
let n = 8
let grid = []
let queue = [];


let possibleKnightMoves = [[1,2],[2,1],[2,-1],[1,-2],[-1,2],[-2,1],[-2,-1],[-1,-2]]

for(let i = 0 ; i < m; i++){
    grid.push([]);
    for(let j = 0; j<n; j++){
        grid[i].push(0)
    }
}

class Node{
    constructor(coords){
        [this.coordsX,this.coordsY] = [...coords];
        this.child = [];
    }
}

function knightMoves(start,end){
    let [targetPosX, targetPosY] = [...end];
    let length = 0;
    let visited = [];

    queue.push(new Node(start));
    visited.push(start); // check if visited already or not;
    while(queue.length>0 ){
        for(item of queue){
            let visitedNode = queue.unshift();
            visited.push([visitedNode.coordsX,visitedNode.coordsY]);
            for(dir of possibleKnightMoves){
                let nextMoveCoords = [visitedNode.coordsX+dir[0],visitedNode.coordsY+dir[1]]  
                if(visited.some(arr=> arr.toString() === nextMoveCoords.toString())){continue}; //if visited, continue loop
                if(nextMoveCoords[0]==targetPosX && nextMoveCoords[1]==targetPosY){
                    visitedNode = new Node(nextMoveCoords[0],nextMoveCoords[1]);
                    length += 1; 
                    return length};
                // queue[0].child.push(new Node(nextMoveCoords));
                // queue.push(queue[0].child);
                queue.push(new Node(nextMoveCoords));
            }
        }
        length = length + 1
    }
    return length;
}

console.log(knightMoves([0,0],[3,3]))
