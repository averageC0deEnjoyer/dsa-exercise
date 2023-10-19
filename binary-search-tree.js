class Node { //to be the root
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
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

    // insert(value){
    //     let current = this.root
    //     let prev = null;
    //     // console.log(current) using conslog to check before after
    //     while(current.left != null && current.right != null){
    //         if(value < current.data){
    //             prev = current;
    //             current = current.left;
    //         } else if (value > current.data) {
    //             prev = current;
    //             current = current.right;
    //         }
            
    //     }

    //     if(value > current.data && current.right == null) {
    //         current.right = new Node(value);
    //     } else if (value < current.data && current.left == null){
    //         current.left = new Node(value);
    //     } else if (value < current.data && current.left != null){
    //         current = current.left;
    //         if(value > current.data){
    //             current.right = new Node (value);
    //         } else if (value < current.data) {
    //             current.left = new Node (value);
    //         }
    //     } else if (value > current.data && current.right != null){
    //         current = current.right;
    //         if(value > current.data){
    //             current.right = new Node (value);
    //         } else if (value < current.data) {
    //             current.left = new Node (value);
    //         }
    //     }
// }

    insert(value){
        let current = this.root
        let prev = null;
        // console.log(current) using conslog to check before after
        while(current.left != null || current.right != null){
            if(value < current.data){
                prev = current;
                current = current.left;
            } else if (value > current.data) {
                prev = current;
                current = current.right;
            }
            if(value < current.data && current.left == null){
                current.left = new Node(value);
                break;
            } else if (value > current.data && current.right == null){
                current.right = new Node(value);
                break;
            }
        } console.log(current)
    }


    delete(value){
        let current = this.root;
        let prev;
        while(current.data != value){
            if(value < current.data){
                prev = current;
                current = current.left;
            } else {
                prev = current;
                current = current.right;
            }
        }
        // after reaching the destination node, then divide the problem to 3 . 1 is if destination node == leaf, 2 is if the node has 1 child, 3 is if the ndoe has 2 child.
        if(current.left == null && current.right == null) { //delete leaf
            if(prev.left != null && prev.left.data == value){
                prev.left = null
            } else {
                prev.right = null
            }
        } else if (current.left != null && current.right != null){
            if(current.right != null) { // delete node if have right child (then traverse to the left of that right child)
                if(current.right.left != null) {
                    let toBeChanged = current;
                    console.log(toBeChanged);
                    let prev;
                    current = current.right;
                    while(current.left != null){
                        prev = current;
                        current = current.left;
                    }
                    // console.log(prev);
                    // console.log(current);
                    toBeChanged.data = current.data;
                    prev.left = null;
                } else {

                }
            }
        } else if (current.left != null && current.right == null) {
            if(prev.left.data == value){
                prev.left = current.left;
            } else if (prev.right.data == value) {
                prev.right = current.left;
            }
        } else if (current.left == null && current.right != null) {
            if(prev.left.data  == value) {
                prev.left = current.right;
            } else if (prev.right.data == value) {
                prev.right = current.right;
            }
        }
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
// let binaryTreeTest = new BinaryTree([1, 7, 4, 23, 8,4, 3, 5, 7, 67, 6345, 324])


// binaryTreeTest.insert(323)
// binaryTreeTest.delete(67)
// binaryTreeTest.delete(23)
// binaryTreeTest.delete(5)


prettyPrint(binaryTreeTest.root)

binaryTreeTest.insert(24)
binaryTreeTest.insert(25)
binaryTreeTest.insert(26)
binaryTreeTest.insert(27)
binaryTreeTest.insert(28)

prettyPrint(binaryTreeTest.root)
