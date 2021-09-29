//第一題
//實作 Fibonacci number (費式數列)
function fib(n) {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}

//第二題
//擇一實作 Debounce 或 Throttle --- 選擇製作 debounce
function debounce(func, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function saveInput() {
  console.log('Saving data');
}

const processChanges = debounce(() => saveInput());

//第三題
//使用 Linked List 實作 Stack


//第四題
//實作 getPagination
getPagination(offset, limit, total);

function getPagination(offset, limit, total) {
  const totalPage = Math.ceil(total / limit); //計算總頁數,避免出現小數點,所以取整數
  let currentPage = offset; //為了防止js出錯所使用的機制,如果當前頁碼大於現在的頁碼(如:明明總共只有6頁,現在在第6頁,結果當前頁碼卻有7頁)
  if (currentPage > totalPage) {
    currentPage = totalPage;
  }
  const maxpage = currentPage * limit; //用來計算每頁顯示最大筆的資料(如:一共100筆資料[0,1,2,3,...],我要每頁顯示6筆,所以1*6=6,第一頁最大筆為第5筆的資料[0,1,2,3,4,5])
  const minpage = currentPage * limit - limit + 1; //用來計算每頁顯示最小筆的資料(如:一共100筆資料[0,1,2,3,...],我要每頁顯示6筆,所以1*6-6=0+1=1,第一頁最小筆為第1筆的資料[0,...]  
  const renderPages = offset + 5;
  //                  {   總頁數,     當前頁數,  往前一頁的按鈕,      往下一頁的按鈕,                 頁籤顯示數量 }
  const pagemanager = { totalPage, currentPage, pre: currentPage > 1, next: currentPage < totalPage, renderPages }; //利用鏡射原理,製作一組物件來供頁碼按鈕使用

  const pagedata = []; //用來儲存元素
  data.forEach((element, index) => {
    const number = index + 1; //用來設計dataset的索引,能夠產生每個頁碼所需的索引資料,再用這個索引來表現切換功能
    if (number >= minpage && number <= maxpage) {
      pagedata.push(element);
    }
  }); 

  pageBtn(pagemanager);

}

function pageBtn(parameter) {
  //開始製作頁碼按鈕,parameter為分頁的數字  

  
  const renderPages = parameter.renderPages;
  let str = '';

  if (parameter.pre) {
    str += `<li class="page-item">
      <a class="page-link" href="#" data-pages="${
        Number(parameter.currentPage) - 1
      }">&lt;&nbsp;prev</a> 
     </li>`;
  }

  for (let i = 1; renderPages >= i; i++) {
    if (Number(parameter.currentPage) === i) {
      str += `
      <li class="page-item">
        <a class="page-link active" href="#" data-pages="${i}">${i}</a>
      </li>
      `;
    } else {
      str += `
      <li class="page-item">
        <a class="page-link" href="#" data-pages="${i}">${i}</a>
      </li>
      `;
    }
  }

  if (parameter.next) {
    str += `
    <li class="page-item">
      <a class="page-link" href="#" data-pages="${
        Number(parameter.currentPage) + 1
      }">next&nbsp;&gt;</a>
    </li>
    `;
  }

  pagen.innerHTML = str;
}


//加分題
//實作 React Custom hook