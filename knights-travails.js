let m = 8
let n = 8
let grid = []
let queue = [];

for(let i = 0 ; i < m; i++){
    grid.push([]);
    for(let j = 0; j<n; j++){
        grid[i].push([i,j])
    }
}
let marked = 'x'
grid[0][0] = marked;



console.log(grid)
