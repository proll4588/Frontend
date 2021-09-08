const dropdown = document.querySelector(".dropdown__icon");
const menu = document.querySelector(".dropdown__menu");
const numbers = document.querySelectorAll(".dropdown__menu-num");
const btns = document.querySelectorAll(".dropdown__menu-btn");
const input = document.querySelector(".dropdown__input");
const clean = document.querySelector(".dropdown__menu-color-btn-clean");
const enter = document.querySelector(".dropdown__menu-color-btn-enter");

var cond = 0;

function setup() {
    if (clean) {
        clean.addEventListener("click", (e) => {
            numbers.forEach((el) => {
                el.innerHTML = "0";
            });

            setCond();
            setName();
        });
    }

    if (dropdown) {
        dropdown.addEventListener("click", (e) => {
            menu.classList.toggle("dropdown__menu-vis");
            input.classList.toggle("dropdown__input-droped");
        });
    }

    if (enter) {
        enter.addEventListener("click", (e) => {
            menu.classList.toggle("dropdown__menu-vis");
            input.classList.toggle("dropdown__input-droped");
        });
    }

    if (input) {
        input.addEventListener("click", (e) => {
            menu.classList.toggle("dropdown__menu-vis");
            input.classList.toggle("dropdown__input-droped");
        });
    }

    if (btns) {
        btns.forEach((el, key) => {
            el.addEventListener("click", (e) => {
                btnClick(key);
            });
        });
    }

    setCond();
    setName();
}

function setCond() {
    btns.forEach((el, key) => {
        var id = key;

        if (id % 2 == 0) {
            if (Number(numbers[id / 2].textContent) == 0) {
                el.classList.add("dropdown__menu-btn_light");
            } else {
                el.classList.remove("dropdown__menu-btn_light");
            }
        }
    });

    if (!sumg()) {
        clean.classList.add("dropdown__btn-invis");
    } else {
        clean.classList.remove("dropdown__btn-invis");
    }
}

function btnClick(key) {
    var id = key;
    if (id % 2 == 0) {
        a = Number(numbers[id / 2].textContent);
        if (a > 0) {
            numbers[id / 2].innerHTML = a - 1;
        }
    } else {
        a = Number(numbers[(id - 1) / 2].textContent);
        numbers[(id - 1) / 2].innerHTML = a + 1;
    }

    setCond();
    setName();
}

function sumg() {
    var sum = 0;
    numbers.forEach((el) => {
        sum += Number(el.textContent);
    });

    return sum;
}

function setName() {
    var num = sumg();

    if (num == 1) {
        input.value = `${num} гость`;
    } else if (num > 1 && num < 5) {
        input.value = `${num} гостя`;
    } else if (num == 0) {
        input.value = `Сколько гостей`;
    } else {
        input.value = `${num} гостей`;
    }
}
if (menu) setup();
