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

var displayedDate = new Date();
var selectedDate = new Date();
var curentDate = new Date();

var is_curent_month = true;

var firstDayOfWeek = 0;
var last = 0;

function setUp() {
    updateDates(displayedDate.getMonth(), displayedDate.getFullYear());

    if (btnBack) {
        btnBack.addEventListener("click", (e) => {
            if (displayedDate.getMonth() == 0) {
                updateDates(11, displayedDate.getFullYear() - 1);
            } else {
                updateDates(
                    displayedDate.getMonth() - 1,
                    displayedDate.getFullYear()
                );
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", (e) => {
            if (displayedDate.getMonth() == 11) {
                updateDates(0, displayedDate.getFullYear() + 1);
            } else {
                updateDates(
                    displayedDate.getMonth() + 1,
                    displayedDate.getFullYear()
                );
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
    displayedDate.setMonth(month);
    displayedDate.setFullYear(year);

    if (
        displayedDate.getMonth() == curentDate.getMonth() &&
        displayedDate.getFullYear() == curentDate.getFullYear()
    )
        is_curent_month = true;
    else is_curent_month = false;

    firstDayOfWeek = new Date(year, month, 1).getDay();
    if (firstDayOfWeek == 0) firstDayOfWeek = 7;

    monthStr.innerHTML =
        monthInf[month].name + " " + displayedDate.getFullYear();

    monthInf[1].day = new Date(year, 2, 0).getDate();

    drawCal();
}

function getWeeks(year, month) {
    var l = new Date(year, month + 1, 0);
    return Math.ceil((l.getDate() - (l.getDay() ? l.getDay() : 7)) / 7) + 1;
}

function drawCal() {
    table.innerHTML = "";
    var row =
        getWeeks(displayedDate.getFullYear(), displayedDate.getMonth()) + 1;
    var colom = 7;
    var k;
    if (displayedDate.getMonth() == 0) {
        k = monthInf[11].day - firstDayOfWeek + 1;
    } else k = monthInf[displayedDate.getMonth() - 1].day - firstDayOfWeek + 1;
    var isThisMonth = false;

    for (var i = 0; i < row; i++) {
        var tr = document.createElement("tr");

        for (var j = 0; j < colom; j++) {
            if (i != 0 && (i - 1) * 7 + j + 1 == firstDayOfWeek) {
                k = 0;
                isThisMonth = true;
            }

            if (i != 0 && (i - 1) * 7 + j + 1 > firstDayOfWeek) {
                if (k + 1 <= monthInf[displayedDate.getMonth()].day) {
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
                if (
                    k == displayedDate.getDate() &&
                    isThisMonth &&
                    is_curent_month
                ) {
                    td.classList.add("calendar__this-day");
                }
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
    const days = document.querySelectorAll(".calendar__day");
    days.forEach((el) => {
        el.addEventListener("click", (e) => {
            selectedDate.setDate(Number(el.textContent));
            selectedDate.setMonth(displayedDate.getMonth());
            selectedDate.setFullYear(displayedDate.getFullYear());
            el.classList.toggle("calendar__set-day");
            if (last != 0) last.classList.toggle("calendar__set-day");
            last = el;
            inputBox.value = `${selectedDate.getDate()}.${selectedDate.getMonth()}.${selectedDate.getFullYear()}`;
        });
    });
}

if (table) setUp();
