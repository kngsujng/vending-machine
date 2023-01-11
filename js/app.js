const btnCokeItems = document.querySelectorAll(".btn_cokeItem");
const btnDeposit = document.querySelector(".btn_deposit");
const btnReturn = document.querySelector(".btn_return");
const txtFund = document.querySelector(".fund");
const txtBalance = document.querySelector(".balance");

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
    console.log("들어왔다!");
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
