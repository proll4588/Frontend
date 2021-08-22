const dropdown = document.querySelector(".dropdown-mini__icon");
const menu = document.querySelector(".dropdown-mini__menu");
const numbers = document.querySelectorAll(".dropdown-mini__menu-num");
const btns = document.querySelectorAll(".dropdown-mini__menu-btn");
const input = document.querySelector(".dropdown-mini__input");

var cond = 0;

if (dropdown && menu && input) {
    dropdown.addEventListener("click", (e) => {
        menu.classList.toggle("dropdown-mini__menu-vis");
        input.classList.toggle("dropdown-mini__input-droped");
    });
}

if (input && menu && input) {
    input.addEventListener("click", (e) => {
        menu.classList.toggle("dropdown-mini__menu-vis");
        input.classList.toggle("dropdown-mini__input-droped");
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
                        btns[id].classList.toggle(
                            "dropdown-mini__menu-btn_light"
                        );
                    }
                }
            } else {
                a = Number(numbers[(id - 1) / 2].textContent);
                numbers[(id - 1) / 2].innerHTML = a + 1;
                if (a == 0) {
                    btns[id - 1].classList.toggle(
                        "dropdown-mini__menu-btn_light"
                    );
                }
            }

            setName();
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
    if (input) {
        if (sumg() == 0) {
            input.value = "Сколько комнат";
        } else {
            var out = "";

            if (Number(numbers[0].textContent) == 1) {
                out += "1 спальня";
            } else if (Number(numbers[0].textContent) > 1) {
                out += `${numbers[0].textContent} спальни`;
            }

            if (Number(numbers[1].textContent) == 1) {
                if (out.length != 0) out += ", ";
                out += "1 кровать";
            } else if (
                Number(numbers[1].textContent) > 1 &&
                Number(numbers[1].textContent) < 5
            ) {
                if (out.length != 0) out += ", ";
                out += `${numbers[1].textContent} кровати`;
            } else if (Number(numbers[1].textContent) > 4) {
                if (out.length != 0) out += ", ";
                out += `${numbers[1].textContent} кроватей`;
            }

            if (Number(numbers[2].textContent) == 1) {
                if (out.length != 0) out += ", ";
                out += "1 ванная комната";
            } else if (Number(numbers[2].textContent) > 1) {
                if (out.length != 0) out += ", ";
                out += `${numbers[2].textContent} ванных комнат`;
            }

            if (out.length > 20) out = out.substring(0, 20) + "...";

            input.value = out;
        }
    }
}
