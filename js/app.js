import coke from "./item.js";

const btnCokeItems = document.querySelectorAll(".btn_cokeItem");
const btnCokeItem = document.querySelector(".btn_cokeItem");
const btnDeposit = document.querySelector(".btn_deposit");
const btnReturn = document.querySelector(".btn_return");
const txtFund = document.querySelector(".fund");
const txtBalance = document.querySelector(".balance");
const gotCokeList = document.querySelector(".gotCoke_list");

const state = {
  coke: coke,
  selectedList: [],
  gotCoke: [],
  balance: 0,
  fund: 0,
};

// 입금액을 input창에 입력하고 입금 버튼을 누르면
// 1. 로컬스토리지에 저장
// 2. 소지금에서 차감
// 3. 잔액 증가
function deposit(event) {
  event.preventDefault();
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
      // localStorage.setItem("fund", txtFund.textContent);
      txtBalance.textContent =
        parseInt(txtBalance.textContent) + parseInt(inpDeposit.value);
      // localStorage.setItem("balance", txtBalance.textContent);
      inpDeposit.value = "";
    }
  } else {
    alert("올바른 금액을 입금해주세요🤢");
    inpDeposit.value = "";
  }
}
btnDeposit.addEventListener("click", deposit);

// 잔액이 부족할 때 경고창 띄우기
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

// 거스름돈반환 버튼 누르면
// 1. 잔액 0으로 감소
// 2. 잔액 금액 -> 소지금 금액에 합쳐진다.
function returnChange(e) {
  e.preventDefault();
  txtFund.textContent =
    parseInt(txtFund.textContent) + parseInt(txtBalance.textContent);
  txtBalance.textContent = "";
}
btnReturn.addEventListener("click", returnChange);

// 음료 데이터 렌더링
function createCokeItems(cokes) {
  const ul = document.querySelector(".coke_list");
  const button = document.createElement("button");

  cokes.forEach((coke) => {
    button.classList.add("btn_cokeItem");

    const li = document.querySelector(".coke_item");

    li.appendChild(btnCokeItem);

    if (!coke.quantity) {
      const soldout = document.createElement("div");
      const soldoutImg = document.createElement("img");

      li.classList.add("soldout");
      li.classList.add("no_event");

      soldout.classList.add("bg_soldout");
      soldoutImg.classList.add("img_soldout");
      soldoutImg.src = "img/soldOut.png";
      btnCokeItem.disabled = true;
      btnCokeItem.hover = false;

      soldout.appendChild(soldoutImg);
      btnCokeItem.appendChild(soldout);
    }

    btnCokeItem.addEventListener("click", () => {
      if (coke.quantity) decreaseQuantity(coke.id);
    });
  });
}

// 음료 개수 감수
function decreaseQuantity(id) {
  const selectedItem = state.coke.find((v) => v.id === id);
  selectedItem.quantity -= 1;

  createCokeItems(state.coke);
  addSelectedItems(selectedItem);
}

// 선택한 음료 추가
function addSelectedItems(item) {
  const itemFound = state.selectedList.find((el) => el.id === item.id);

  if (itemFound) {
    itemFound.quantity += 1;
  } else {
    state.selectedList.push({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.item,
      quantity: 1,
    });
  }

  showSelectedItems();
}

// 선택한 음료 보여주기
function showSelectedItems() {
  gotCokeList.innerHTML = "";

  state.selectedList.forEach((item) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const gotCokeName = document.createElement("span");
    const gotCokeCount = document.createElement("div");
    const ir_gotCokeCount = document.createElement("p");

    li.classList.add("gotCoke_item");
    gotCokeCount.classList.add("gotCoke_count");
    ir_gotCokeCount.classList.add("blind");

    img.src = `${item.img}`;
    gotCokeName.textContent = item.name;
    gotCokeCount.textContent = item.quantity;
    ir_gotCokeCount.textContent = "획득한 음료 개수";

    gotCokeCount.appendChild(ir_gotCokeCount);
    li.appendChild(img);
    li.appendChild(gotCokeName);
    li.appendChild(gotCokeCount);
    gotCokeList.appendChild(li);
  });
}

createCokeItems(state.coke);
