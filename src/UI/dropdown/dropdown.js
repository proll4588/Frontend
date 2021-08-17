const dropdown = document.querySelector(".dropdown__icon");
const menu = document.querySelector(".dropdown__menu");
const numbers = document.querySelectorAll(".dropdown__menu-num");
const btns = document.querySelectorAll(".dropdown__menu-btn");
const input = document.querySelector(".dropdown__input");
const clean = document.querySelector(".dropdown__menu-color-btn-clean");
const enter = document.querySelector(".dropdown__menu-color-btn-enter");

var cond = 0;

if (clean) {
    clean.addEventListener("click", (e) => {
        for (var i = 0; i < numbers.length; i++) {
            if (numbers[i].textContent != 0) {
                btns[i * 2].classList.toggle("dropdown__menu-btn_light");
            }
        }

        numbers.forEach((el) => {
            el.innerHTML = "0";
        });

        toogleVis();
        cond = 0;
        setName(0);
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
            var id = key;
            var a;
            if (id % 2 == 0) {
                a = Number(numbers[id / 2].textContent);

                if (a > 0) {
                    numbers[id / 2].innerHTML = a - 1;
                    if (a - 1 == 0) {
                        btns[id].classList.toggle("dropdown__menu-btn_light");
                    }
                }
            } else {
                a = Number(numbers[(id - 1) / 2].textContent);
                numbers[(id - 1) / 2].innerHTML = a + 1;
                if (a == 0) {
                    btns[id - 1].classList.toggle("dropdown__menu-btn_light");
                }
            }

            if (cond == 0 && sumg() != 0) {
                toogleVis();
                cond = 1;
            } else if (cond != 0 && sumg() == 0) {
                cond = 0;
                toogleVis();
            }

            setName(sumg());
        });
    });
}

function sumg() {
    var sum = 0;
    numbers.forEach((el) => {
        sum += Number(el.textContent);
    });

    return sum;
}

function setName(num) {
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

function toogleVis() {
    clean.classList.toggle("dropdown__btn-invis");
}
