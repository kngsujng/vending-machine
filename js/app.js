import cokeData from "./item.js";

const btnCokeItems = document.querySelectorAll(".btn_cokeItem");
const btnCokeItem = document.querySelector(".btn_cokeItem");
const btnDeposit = document.querySelector(".btn_deposit");
const btnReturn = document.querySelector(".btn_return");
const txtFund = document.querySelector(".fund");
const txtBalance = document.querySelector(".balance");
const gotCokeList = document.querySelector(".gotCoke_list");

// 입금액을 input창에 입력하고 입금 버튼을 누르면
// 1. 로컬스토리지에 저장
// 2. 소지금에서 차감
// 3. 잔액 증가

function deposit(event) {
  const inpDeposit = document.querySelector(".inp_deposit");

  if (Number.isInteger(+inpDeposit.value)) {
    if (parseInt(inpDeposit.value) < 0) {
      alert("0보다 큰 값을 입력해주세요🤢");
      inpDeposit.value = "";
    } else if (parseInt(inpDeposit.value) > parseInt(txtFund.textContent)) {
      alert("소지금보다 큰 금액을 입력하셨습니다🤢");
      inpDeposit.value = "";
    } else {
      txtFund.textContent =
        parseInt(txtFund.textContent) - parseInt(inpDeposit.value);
      localStorage.setItem("fund", txtFund.textContent);
      txtBalance.textContent =
        parseInt(txtBalance.textContent) + parseInt(inpDeposit.value);
      localStorage.setItem("balance", txtBalance.textContent);
      inpDeposit.value = "";
    }
  } else {
    alert("올바른 금액을 입금해주세요🤢");
    inpDeposit.value = "";
  }
}
btnDeposit.addEventListener("click", deposit);

// 음료버튼 위에 마우스오버하면 active, 마우스리브하면 active 해제
for (let i = 0; i < btnCokeItems.length; i++) {
  btnCokeItems[i].addEventListener("mouseenter", function () {
    btnCokeItems[i].classList.add("active");
  });
}
for (let i = 0; i < btnCokeItems.length; i++) {
  btnCokeItems[i].addEventListener("mouseleave", function () {
    btnCokeItems[i].classList.remove("active");
  });
}

// btnCokeitem 누르면
// 0. 잔액보다 적으면 alert창 띄워주기
// 1. 잔액 감소
// 2. preview 수정
// 2-1. 이미 있으면 개수 바꿔주기
// 2-2. 없으면 들어가기
// 3. dummy데이터의 quantity가 0으로 되면 품절 띄워주기

for (let i = 0; i < btnCokeItems.length; i++) {
  btnCokeItems[i].addEventListener("click", function () {
    if (+txtBalance.textContent < 1000) {
      alert("잔액이 부족합니다😓 돈을 입금해주세요.");
      return;
    } else {
      txtBalance.textContent = parseInt(txtBalance.textContent) - 1000;
    }
  });
}

// 거스름돈반환 버튼 누르면 : 잔액 0으로 감소
function returnChange(e) {
  e.preventDefault();
  txtBalance.textContent = "";
}
btnReturn.addEventListener("click", returnChange);

// 빨간 음료만 해당된다 ㅠㅠ
let clickCount = 0;
const li = document.createElement("li");
const img = document.createElement("img");
const gotCokeName = document.createElement("span");
const gotCokeCount = document.createElement("div");
const ir_gotCokeCount = document.createElement("p");

li.classList.add("gotCoke_item");
img.setAttribute("src", `${cokeData[0].img}`);
img.setAttribute("alt", "획득한 음료 중 오리지널 콜라");
gotCokeName.textContent = cokeData[0].name;
gotCokeCount.classList.add("gotCoke_count");
ir_gotCokeCount.classList.add("blind");
ir_gotCokeCount.textContent = "획득한 음료 중 오리지널 콜라 개수";
gotCokeCount.textContent = `${clickCount}`;

gotCokeCount.appendChild(ir_gotCokeCount);
li.appendChild(img);
li.appendChild(gotCokeName);
li.appendChild(gotCokeCount);

function addCoke(e) {
  e.preventDefault();
  clickCount += 1;
  gotCokeCount.textContent = `${clickCount}`;
  if (gotCokeList.hasChildNodes() === false) {
    gotCokeList.appendChild(li);
  } else {
    console.log("이미 preview에 들어있지롱!");
  }
}

btnCokeItem.addEventListener("click", addCoke);
