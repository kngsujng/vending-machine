const btnCokeItems = document.querySelectorAll(".btn_cokeItem");
const btnDeposit = document.querySelector(".btn_deposit");
const txtFund = document.querySelector(".fund");
const txtBalance = document.querySelector(".balance");

// 입금액을 input창에 입력하고 입금 버튼을 누르면
// 1. 로컬스토리지에 저장
// 2. 소지금에서 차감
// 3. 잔액에 바로 반영

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

btnDeposit.addEventListener("click", deposit);
