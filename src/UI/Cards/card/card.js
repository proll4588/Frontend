// ========================== //
var pos = 1;
var maxPos = 4;

const arrow_left = document.querySelector(".card__arrow_back");
const arrow_right = document.querySelector(".card__arrow_forward");
const radio = document.querySelectorAll(".card__switcher-box");
const img = document.querySelectorAll(".card__img");

//Обрабтка событий при нажатии на рабиокнопку
if (radio) {
    radio.forEach((el) => {
        el.addEventListener("click", (e) => {
            toggleImg(pos);
            pos = findPos();
            toggleImg(pos);
        });
    });
}

//Обрабтка событий при нажатии на стрелки
if (arrow_right) {
    arrow_right.addEventListener("click", (e) => {
        toggleImg(pos);
        if (pos < maxPos) {
            pos++;
        } else {
            pos = 1;
        }
        setRadio(pos);
        toggleImg(pos);
    });
}

if (arrow_left) {
    arrow_left.addEventListener("click", (e) => {
        toggleImg(pos);
        if (pos > 1) {
            pos--;
        } else {
            pos = 4;
        }
        setRadio(pos);
        toggleImg(pos);
    });
}

//Отмечает заднную радиокнопку
function setRadio(num) {
    for (var i = 0; i < maxPos; i++) {
        if (i + 1 == num) {
            radio[i].checked = true;
        } else {
            radio[i].checked = false;
        }
    }
}

//Находит отмеченную радиокнопку
function findPos() {
    var pos = 0;
    for (var i = 0; i < maxPos; i++) {
        if (radio[i].checked == true) {
            pos = i + 1;
            break;
        }
    }
    return pos;
}

// переключает класс у заданной картинки
function toggleImg(num) {
    img[num - 1].classList.toggle("card__img_w");
}
