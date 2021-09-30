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

const pg = { currentPage: 1, totalPage: 1, renderPages: 5 };
const pgdata = [];
const pgnum = [];
const pagen = document.querySelector('.pagen');

function getPagination(offset, limit, total) {
  pg.totalPage = Math.ceil(total / limit);
  if (pg.currentPage > pg.totalPage) {
    pg.currentPage = pg.totalPage;
  }

  const maxdata = pg.currentPage * limit;
  const mindata = pg.currentPage * limit - limit + 1;
  for (let j = 0; j < total; j++) {
    if (j + 1 >= mindata && j + 1 <= maxdata) {
      pgdata.push(j);
    }
  }
  pagebtn(pg);
  console.log(pg);
}

function pagebtn(data) {
  let maxStart = data.currentPage;
  let maxEnd = data.currentPage + data.renderPages - 1;

  if (maxEnd > data.totalPage) {
    maxStart = data.totalPage - (data.renderPages - 1);
    maxEnd = data.totalPage;
  } else {
    maxStart = 1;
    maxEnd = data.renderPages;
  }

  let str = ``;
  for (let i = maxStart; i <= maxEnd; i++) {
    if (Number(data.currentPage) === i) {
      str += `
      <li class="page-item active">
        <a class="page-link" href="#" data-pages="${i}">${i}</a>
      </li>
      `;
    } else {
      str += `
      <li class="page-item">
        <a class="page-link" href="#" data-pages="${i}">${i}</a>
      </li>
      `;
    }
    //str += `<li class="page-item"><a class="page-link" data-pages="${i}">${i}</a></li>`;
  }
  pagen.innerHTML = str;
  console.log(maxStart);
}

function clickpage(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') {
    return;
  }
  const pagen = e.target.dataset.pages;
  pg.currentPage = Number(pagen);
  getPagination(0, 5, 33);
  pagebtn(pg);
}

pagen.addEventListener('click', clickpage);

getPagination(0, 5, 33);

//加分題
//實作 React Custom hook
