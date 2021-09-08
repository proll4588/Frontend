const blocksRigth = document.querySelectorAll(".room-info__info-block-right");
const blocksLeft = document.querySelectorAll(".room-info__info-block-left");
const inputBoxes = document.querySelectorAll(".date-dropdown__input");
const costBlock = document.querySelector(".room-info__cost-room");
const dropdown = document.querySelector(".dropdown__input");
const fullSum = document.querySelector(".room-info__full-sum-rigth");

var cost = 0;
var discount = 0;
var people = 0;

var selectedDate = { start: 0, end: 0 };
var days = 0;

function setup() {
    document.addEventListener("click", () => {
        update();
    });

    update();
}

function getValue() {
    if (costBlock) {
        cost = Number(costBlock.innerHTML.replace(/\D/g, ""));
    }

    if (blocksLeft) {
        discount = Number(blocksLeft[1].innerHTML.replace(/\D/g, ""));
    }

    if (dropdown) {
        people = Number(dropdown.value.replace(/\D/g, ""));
    }

    if (inputBoxes) {
        getDates();

        days = countDays();
    }
}

function update() {
    getValue();
    fillInfo();
}

function getDates() {
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

    if (inputBoxes[0].value) {
        selectedDate.start = new Date(
            inputBoxes[0].value.replace(pattern, "$3-$2-$1")
        );
    }

    if (inputBoxes[1].value) {
        selectedDate.end = new Date(
            inputBoxes[1].value.replace(pattern, "$3-$2-$1")
        );
    }

    console.log(selectedDate);
}

function countDays() {
    return (
        Math.ceil(
            (selectedDate.end.getTime() - selectedDate.start.getTime()) /
                (1000 * 60 * 60 * 24)
        ) + 1
    );
}

function fillInfo() {
    blocksLeft[0].innerHTML = costBlock.innerHTML + " x " + days + " суток";
    blocksRigth[0].innerHTML = cost * days;
    blocksRigth[0].innerHTML =
        blocksRigth[0].innerHTML.slice(0, blocksRigth[0].innerHTML.length - 3) +
        " " +
        blocksRigth[0].innerHTML.slice(blocksRigth[0].innerHTML.length - 3) +
        "₽";

    blocksRigth[2].innerHTML = String(100 * people) + "₽";

    fullSum.innerHTML = String(cost * days - discount + 100 * people);
    fullSum.innerHTML =
        fullSum.innerHTML.slice(0, fullSum.innerHTML.length - 3) +
        " " +
        fullSum.innerHTML.slice(fullSum.innerHTML.length - 3) +
        "₽";
}
if (costBlock) setup();
