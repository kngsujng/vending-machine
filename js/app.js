import coke from "./item.js";

const state = {
  coke: coke,
  selectedList: [],
  gotCoke: [],
  balance: 0,
  fund: 0,
};

const btnReturn = document.querySelector(".btn_return");
const btnDeposit = document.querySelector(".btn_deposit");
const btnGet = document.querySelector(".btn_get");
const txtBalance = document.querySelector(".balance");
const txtFund = document.querySelector(".fund"); //5만원 소지금 고정
const inpDeposit = document.querySelector(".inp_deposit");
const ulSelected = document.querySelector(
  ".Con-gotCokeList_preview .gotCoke_list"
);
const ulGotcoke = document.querySelector(".Con-gotCokeList .gotCoke_list");

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
      txtBalance.textContent =
        parseInt(txtBalance.textContent) + parseInt(inpDeposit.value);
      inpDeposit.value = "";
    }
  } else {
    alert("올바른 금액을 입금해주세요🤢");
    inpDeposit.value = "";
  }
}
btnDeposit.addEventListener("click", deposit);

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
  ul.innerHTML = "";

  cokes.forEach((coke) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const img = document.createElement("img");
    const spanName = document.createElement("span");
    const spanPrice = document.createElement("span");

    li.classList.add("coke_item");
    button.classList.add("btn_cokeItem");
    spanName.classList.add("cokeItem_name");
    spanPrice.classList.add("cokeItem_price");

    img.src = `${coke.img}`;
    spanName.textContent = `${coke.name}`;
    spanPrice.textContent = `${coke.price}원`;

    ul.appendChild(li);
    li.appendChild(button);
    button.append(img, spanName, spanPrice);

    // 음료수량이 없다면 품절 표시 띄워주기
    if (!coke.quantity) {
      const soldout = document.createElement("div");
      const soldoutImg = document.createElement("img");

      li.classList.add("soldout");
      li.classList.add("no_event");
      soldout.classList.add("bg_soldout");
      soldoutImg.classList.add("img_soldout");
      soldoutImg.src = "img/soldOut.png";
      button.disabled = true;
      button.hover = false;

      soldout.appendChild(soldoutImg);
      button.appendChild(soldout);
    }

    button.addEventListener("click", () => {
      if (+txtBalance.textContent < 1000) {
        alert("잔액이 부족합니다😓 돈을 입금해주세요.");
        return;
      } else {
        txtBalance.textContent = parseInt(txtBalance.textContent) - 1000;
      }
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
      img: item.img,
      quantity: 1,
    });
  }

  showSelectedItems();
}

// 선택한 음료 보여주기
function showSelectedItems() {
  ulSelected.innerHTML = "";

  state.selectedList.forEach((item) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const gotCokeName = document.createElement("span");
    const gotCokeCount = document.createElement("div");

    li.classList.add("gotCoke_item");
    gotCokeCount.classList.add("gotCoke_count");

    img.src = `${item.img}`;
    gotCokeName.textContent = item.name;
    gotCokeCount.textContent = item.quantity;

    li.append(img, gotCokeName, gotCokeCount);
    ulSelected.appendChild(li);
  });
}
createCokeItems(state.coke);

// 획득버튼 눌렀을 때
function getUserCoke() {
  // if (!state.balance || !state.selectedList.length) return;

  state.selectedList.forEach((item) => {
    const itemAlready = state.gotCoke.find((v) => v.id === item.id);

    if (itemAlready) {
      itemAlready.quantity += item.quantity;
    } else {
      state.gotCoke.push({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        quantity: item.quantity,
      });
    }
  });
  showUserCoke();
  return;
}

function showUserCoke() {
  const ul = document.querySelector(".gotCoke_list");
  ul.innerHTML = "";

  state.gotCoke.forEach((item) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const gotCokeName = document.createElement("span");
    const gotCokeCount = document.createElement("div");

    li.classList.add("gotCoke_item");
    gotCokeCount.classList.add("gotCoke_count");

    img.src = `${item.img}`;
    gotCokeName.textContent = item.name;
    gotCokeCount.textContent = item.quantity;

    li.append(img, gotCokeName, gotCokeCount);
    ul.appendChild(li);
    ulGotcoke.appendChild(ul);
  });
}

btnGet.addEventListener("click", getUserCoke);
btnGet.addEventListener("click", returnChange);
btnGet.addEventListener("click", () => {
  btnGet.disabled = true;
});
btnReturn.addEventListener("click", () => {
  btnReturn.disabled = true;
});
btnDeposit.addEventListener("click", () => {
  btnDeposit.disabled = true;
});
