//第一題
//實作 Fibonacci number (費式數列)
function fib_cal(n) {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fib_cal(n - 1) + fib_cal(n - 2);
  }
}

//第二題
//擇一實作 Debounce 或 Throttle --- 選擇製作 debounce
function debounce(func, delay) {
  let HoldDown;
  return (...items) => {
    clearTimeout(HoldDown); // 每次執行前先清除前一次的setTimeout
    HoldDown = setTimeout(() => {   //執行setTimeout
      func.apply(this, items);
    }, delay);
  };
}

function isActive() {
  console.log('show data');
}

const debounceFunc = debounce(() => isActive(), 250);

//第三題
//使用 Linked List 實作 Stack

class Node {
  //製作資料節點
  constructor(data) {
    this.data = data; //資料內容
    this.next = null; //下一個節點
  }
}

class Stack {
  constructor() {
    this.head = null; //linked list的開頭
    this.tail = null; //linked list的結尾
    this.length = 0; //linked list的節點數量
  }

  isEmpty() {
    //判斷 linked list 內的資料是否為空
    return this.length === 0;
  }

  push(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }
  

  removeAt(index) {
    if (index < 0 || index >= this.length) return;

    if (index === 0) {
      this.head = this.head.next;
    } else {
      const prevNode = this.getNode(index - 1);
      const delNode = prevNode.next;
      const nextNode = delNode.next;
      prevNode.next = nextNode;
      if (nextNode === null) {
        this.tail = prevNode;
      }
    }
    this.length -= 1;
  }
  

  pop() {
    const tailNum = this.length - 1;
    const temp = [];
    let currNode = this.head;
    while (currNode) {
      temp.push(currNode.data);
      currNode = currNode.next;
    }
    const myPop = temp.pop();
    console.log(myPop);
    return this.removeAt(tailNum);
  }
 

  getNode(index) {
    if (index < 0 || index >= this.length) return null;
    let currNode = this.head;
    let currIndex = 0;
    while (currIndex < index) {
      currIndex += 1;
      currNode = currNode.next;
    }
    return currNode;
  }

  size() {
    console.log(this.length);
    return this.length;
  }

  print() {
    const temp = [];
    let currNode = this.head;
    while (currNode) {
      temp.push(currNode.data);
      currNode = currNode.next;
    }
    return temp.join(', ');
  }
}

const myStack = new Stack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.pop();
myStack.size();
console.log(myStack.print());


//第四題
//實作 getPagination

const ser = { currentPage: 1, totalPage: 1, renderPages: [] };

function getPagination(offset, limit, total) {
  let allpage = Math.ceil(total / limit);
  ser.totalPage = allpage;

  let pg_pack;
  let pgdata_pack = [];

  for (let n = 0; n < total; n++) {
    pgdata_pack.push(n);
  }

  pg_pack = group(pgdata_pack, limit);

  pg_pack.forEach((item, index) => {
    let local = pg_pack[index].indexOf(offset);

    if (local !== -1) {
      ser.currentPage = index + 1;
    }
  });

  let maxLeft = ser.currentPage - Math.floor(limit / 2);
  let maxRight = ser.currentPage + Math.floor(limit / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = limit;
  }

  if (maxRight > allpage) {
    maxLeft = allpage - (limit - 1);

    if (maxLeft < 1) {
      maxLeft = 1;
    }
    maxRight = allpage;
  }
  ser.renderPages = [];
  for (let i = maxLeft; i <= maxRight; i++) {
    ser.renderPages.push(i);
  }

  console.log(ser);
}

function group(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
}

getPagination(5, 5, 33);

//加分題
//實作 React Custom hook
