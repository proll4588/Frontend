var weeks = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
var monthInf = [
    { name: "Январь", day: 31 },
    { name: "Февраль", day: 28 },
    { name: "Март", day: 31 },
    { name: "Апрель", day: 30 },
    { name: "Май", day: 31 },
    { name: "Июнь", day: 30 },
    { name: "Июль", day: 31 },
    { name: "Август", day: 31 },
    { name: "Сентябрь", day: 30 },
    { name: "Октябрь", day: 31 },
    { name: "Ноябрь", day: 30 },
    { name: "Декабрь", day: 31 },
];

const btnNext = document.querySelector(".calendar__btn-next");
const btnBack = document.querySelector(".calendar__btn-back");
const clear = document.querySelector(".calendar__btn-clear");
const monthStr = document.querySelector(".calendar__month");
const table = document.querySelector(".calendar__body");
const btnDown = document.querySelector(".date-dropdown__icon");
const calendar = document.querySelector(".calendar");
const inputBox = document.querySelector(".date-dropdown__input");

var days;

var today = new Date();
var firstday = new Date();
var date = new Date();

var curentDate = new Date();
var is_curent_month = true;

var last = 0;
var firstdayday;

function setUp() {
    updateDates(today.getMonth(), today.getFullYear());

    if (btnBack) {
        btnBack.addEventListener("click", (e) => {
            if (today.getMonth() == 0) {
                updateDates(11, today.getFullYear() - 1);
            } else {
                updateDates(today.getMonth() - 1, today.getFullYear());
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", (e) => {
            if (today.getMonth() == 11) {
                updateDates(0, today.getFullYear() + 1);
            } else {
                updateDates(today.getMonth() + 1, today.getFullYear());
            }
        });
    }

    if (btnDown) {
        btnDown.addEventListener("click", (e) => {
            calendar.classList.toggle("date-dropdown__calendar_vis");
        });
    }

    if (clear) {
        clear.addEventListener("click", (e) => {
            document
                .querySelector(".calendar__set-day")
                .classList.toggle("calendar__set-day");
            last = 0;
        });
    }
}

function updateDates(month, year) {
    date.setFullYear(year);

    today.setMonth(month);
    today.setFullYear(year);

    firstday.setMonth(month);
    firstday.setFullYear(year);

    if (
        month != curentDate.getMonth() ||
        today.getFullYear() != curentDate.getFullYear()
    ) {
        is_curent_month = false;
    } else {
        is_curent_month = true;
    }

    firstday.setDate(1);

    firstdayday = firstday.getDay();
    if (firstday.getDay() == 0) firstdayday = 7;

    monthStr.innerHTML = monthInf[month].name + " " + today.getFullYear();

    monthInf[1].day = new Date(year, 2, 0).getDate();

    drawCal();
}

function getWeeks(year, month) {
    var l = new Date(year, month + 1, 0);
    return Math.ceil((l.getDate() - (l.getDay() ? l.getDay() : 7)) / 7) + 1;
}

function drawCal() {
    table.innerHTML = "";
    var row = getWeeks(today.getFullYear(), today.getMonth()) + 1;
    var colom = 7;
    var k;
    if (today.getMonth() == 0) {
        k = monthInf[11].day - firstdayday + 1;
    } else k = monthInf[today.getMonth() - 1].day - firstdayday + 1;
    var isThisMonth = false;

    for (var i = 0; i < row; i++) {
        var tr = document.createElement("tr");

        for (var j = 0; j < colom; j++) {
            if (i != 0 && (i - 1) * 7 + j + 1 == firstdayday) {
                k = 0;
                isThisMonth = true;
            }

            if (i != 0 && (i - 1) * 7 + j + 1 > firstdayday) {
                if (k + 1 <= monthInf[today.getMonth()].day) {
                    k++;
                } else {
                    k = 1;
                    isThisMonth = false;
                }
            } else if (i != 0) {
                k++;
            }

            var td = document.createElement("td");
            if (i == 0) {
                td.innerHTML = weeks[j];
                td.classList.add("calendar__week");
            } else {
                td.innerHTML = k;
                td.classList.add("calendar__day");
                if (!isThisMonth) {
                    td.classList.add("calendar__not-this-week");
                }
                if (k == today.getDate() && isThisMonth && is_curent_month) {
                    td.classList.add("calendar__this-day");
                }
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
    days = document.querySelectorAll(".calendar__day");
    days.forEach((el) => {
        el.addEventListener("click", (e) => {
            date.setDate(Number(el.textContent));
            date.setMonth(today.getMonth());
            el.classList.toggle("calendar__set-day");
            if (last != 0) last.classList.toggle("calendar__set-day");
            last = el;
            inputBox.value = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
        });
    });
}

if (table) setUp();
