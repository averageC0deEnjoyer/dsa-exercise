class Node { //to be the root
    constructor(data){
        this.data = data;
        this.left;
        this.right;
    }
}


class BinaryTree{
    constructor(arr){
        this.sortedArr = this.sortArr(arr)
        this.root = this.sortedArrToBST(this.sortedArr)
    }

    sortArr(array){
        let a = [...new Set(array)].sort(function(a,b){return a-b});  
        return a;
    }

    sortedArrToBST(arr, start=0, end = arr.length -1) {
        if(start > end) return null;
        let mid = Math.round((start+end)/2);
        let node = new Node(arr[mid]);
        node.left = this.sortedArrToBST(arr, start, mid-1);
        node.right = this.sortedArrToBST(arr, mid+1, end);
        return node;
    }

    
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
    return;
    }
    if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};



let binaryTreeTest = new BinaryTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

prettyPrint(binaryTreeTest.root)