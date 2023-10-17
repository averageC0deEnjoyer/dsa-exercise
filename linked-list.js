class LinkedList {
    constructor(head = null){
        this.length = 0;
        this.head = head;
    }

    append(value){
        let current = this.head;
        if(current == null) {
            this.head = new ListNode(value);
            this.length++;
        } else {
            while(current.next != null){
                current = current.next
            } // go into the last node
            current.next = new ListNode(value);
            this.length++;
        }
    }

    prepend(value){
        this.head = new ListNode(value, this.head)
        this.length++;
    }

    get header() {
        return this.head.data;
    }

    get tail() {
        let current = this.head;
        while(current.next != null){
            current = current.next
        }
        return current.data;
    }

    at(index){
        if(index < 0 || index > this.length) return;
        let current = this.head;
        // let i=1;
        // while(i<=index){
        //     current = current.next;
        //     i++;
        // }
        for(let i = 0; i < index; i++){
            current = current.next;
        }
        return current;
    }

    pop() {
        let current = this.head;
        for(let i = 0; i < this.length - 1; i++) {
            current = current.next;
        }
        delete current.data;
        current.next = null;
        this.length--;
    }

}


class ListNode {
    constructor(data, next = null){
        this.data = data;
        this.next = next;
    } 
}


let ll = new LinkedList()
ll.append(10)
ll.append(20)
ll.append(30)
ll.append(40)
ll.prepend(25)
console.log(ll)