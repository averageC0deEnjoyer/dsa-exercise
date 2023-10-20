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


    insert(value){
        let current = this.root;
        let prev = null;
        // console.log(current) using conslog to check before after
        while(current.left != null || current.right != null){
            if(value == current) return;
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
        } 
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
            // delete node if have right child (then traverse to the left of that right child)
            if(current.right.left != null) {
                let toBeChanged = current;
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
            } else if (current.right.left == null){
                if(prev.right.data == value) {
                    prev.right.data = current.right.data;
                    current.right = null;
                } else if (prev.left.data == value) {
                    prev.left.data = current.right.data;
                    current.right = null;
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

    find(value){
        let current = this.root;
        let prev;
        while(current != null && current.data != value){
            if(value < current.data){
                prev = current;
                current = current.left;
            } else {
                prev = current;
                current = current.right;
            }
        }
        return current;
    }

    leverOrderTraversal(node = this.root){
        let arrayQueue = [];
        let arrayResult = [];
        arrayQueue.push(node)
        while(arrayQueue.length > 0){
            arrayResult.push(arrayQueue[0].data);
            if(arrayQueue[0].left != null){
                arrayQueue.push(arrayQueue[0].left)
            }
            if(arrayQueue[0].right != null){
                arrayQueue.push(arrayQueue[0].right)
            }
            arrayQueue.shift();
        }
        return arrayResult;
    }

    preOrder(node = this.root, arrayResult = []){
        if(node == null){return};

        arrayResult.push(node.data);
        this.preOrder(node.left, arrayResult);
        this.preOrder(node.right, arrayResult);

        return arrayResult;
    }

    inOrder(node = this.root, arrayResult = []){
        if(node == null){return};

        this.inOrder(node.left, arrayResult);
        arrayResult.push(node.data);
        this.inOrder(node.right, arrayResult);

        return arrayResult;
    }

    postOrder(node = this.root, arrayResult = []){
        if(node == null){return};

        this.postOrder(node.left, arrayResult);
        this.postOrder(node.right, arrayResult);
        arrayResult.push(node.data)

        return arrayResult;
    }


    height(node = this.root){
    
        if(node == null){return -1};

        let lHeight = this.height(node.left);
        let rHeight = this.height(node.right);

        return Math.max(lHeight,rHeight)+1;
    }


    depth(node, current = this.root, depth = 0){
        if(node.data == current.data) {return 0};

        if(node.data < current.data){
            return 1 + this.depth(node, current.left);
        } else if(node.data > current.data) {
            return 1 + this.depth(node, current.right);
        } else {
            return -1
        }
    }

    isBalanced(node = this.root){
        let result;
        let lHeight = this.height(node.left);
        let rHeight = this.height(node.right);
        Math.abs(lHeight-rHeight) > 1 ? result = false : result = true 
        return result;
    }

    rebalanced(value){
        if(value == false){
            let current = this.root
            let newArray = this.leverOrderTraversal(current);
            let a = [...new Set(newArray)].sort(function(a,b){return a-b});  
            this.root = this.sortedArrToBST(a)
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

prettyPrint(binaryTreeTest.root)

binaryTreeTest.insert(24)
// binaryTreeTest.insert(335)
// binaryTreeTest.insert(334)
// binaryTreeTest.insert(333)
// binaryTreeTest.insert(332)
// binaryTreeTest.insert(331)
// binaryTreeTest.insert(330)
// binaryTreeTest.insert(323)
// binaryTreeTest.insert(322)
// binaryTreeTest.insert(321)
// binaryTreeTest.insert(320)
// binaryTreeTest.insert(336)
// binaryTreeTest.insert(337)
// binaryTreeTest.insert(338)
binaryTreeTest.insert(324)
binaryTreeTest.insert(325)
binaryTreeTest.insert(6346)
binaryTreeTest.insert(25)
binaryTreeTest.insert(326)

console.log(binaryTreeTest.sortedArr)

prettyPrint(binaryTreeTest.root)

console.log(binaryTreeTest.isBalanced())

console.log(binaryTreeTest.rebalanced(binaryTreeTest.isBalanced()))

prettyPrint(binaryTreeTest.root)
