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
const enter = document.querySelector(".calendar__btn-enter");
const monthStr = document.querySelector(".calendar__month");
const table = document.querySelector(".calendar__body");

const calendar = document.querySelector(".calendar");
const calendar_body = document.querySelector(".date-dropdown__calendar");
const inputBoxes = document.querySelectorAll(".date-dropdown__input");
const inputBox = document.querySelector(".filter-date-dropdown__input");

const blocksRigth = document.querySelectorAll(".room-info__info-block-right");
const blocksLeft = document.querySelectorAll(".room-info__info-block-left");

var displayedDate = new Date();
var selectedDate = { start: 0, end: 0 };
var curentDate = new Date();

var is_curent_month = true;

var firstDayOfWeek = 0;

function setUp() {
    if (inputBoxes) {
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
    }

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

    if (enter) {
        enter.addEventListener("click", () => {
            calendar_body.classList.toggle("date-dropdown__calendar_invis");
        });
    }

    if (clear) {
        clear.addEventListener("click", (e) => {
            document.querySelectorAll(".calendar__set-day").forEach((el) => {
                el.classList.toggle("calendar__set-day");
            });

            selectedDate.start = 0;
            selectedDate.end = 0;

            if (inputBoxes.length != 0) {
                inputBoxes[0].value = "";
                inputBoxes[1].value = "";
            }

            if (inputBox) {
                inputBox.value = "";
            }

            drawCal();
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

                //----------------------------------------//
                //----Задание класса для выбранных дат----//
                //----------------------------------------//
                if (selectedDate.start != 0 && isThisMonth) {
                    if (
                        displayedDate.getFullYear() ==
                            selectedDate.start.getFullYear() &&
                        displayedDate.getMonth() ==
                            selectedDate.start.getMonth() &&
                        k == selectedDate.start.getDate()
                    ) {
                        td.id = "selectedFirstDay";
                    }
                }
                if (selectedDate.end != 0 && isThisMonth) {
                    if (
                        displayedDate.getFullYear() ==
                            selectedDate.end.getFullYear() &&
                        displayedDate.getMonth() ==
                            selectedDate.end.getMonth() &&
                        k == selectedDate.end.getDate()
                    ) {
                        td.id = "selectedLastDay";
                    }
                }

                if (
                    selectedDate.start != 0 &&
                    selectedDate.end != 0 &&
                    isThisMonth &&
                    (selectedDate.start.getMonth() ==
                        displayedDate.getMonth() ||
                        selectedDate.end.getMonth() ==
                            displayedDate.getMonth()) &&
                    (selectedDate.start.getFullYear() ==
                        displayedDate.getFullYear() ||
                        selectedDate.end.getFullYear() ==
                            displayedDate.getFullYear())
                ) {
                    if (
                        selectedDate.start.getMonth() ==
                        selectedDate.end.getMonth()
                    ) {
                        if (
                            k >= selectedDate.start.getDate() &&
                            k <= selectedDate.end.getDate()
                        ) {
                            td.classList.add("calendar__set-day");
                        }
                    } else {
                        if (
                            (k >= selectedDate.start.getDate() &&
                                selectedDate.start.getMonth() ==
                                    displayedDate.getMonth()) ||
                            (k <= selectedDate.end.getDate() &&
                                selectedDate.end.getMonth() ==
                                    displayedDate.getMonth())
                        ) {
                            td.classList.add("calendar__set-day");
                        }
                    }
                }

                //----------------------------------------//
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    setData();
}

function setData() {
    const days = document.querySelectorAll(".calendar__day");

    days.forEach((el) => {
        el.addEventListener("click", (e) => {
            if (
                (el.textContent >= curentDate.getDate() &&
                    curentDate.getMonth() == displayedDate.getMonth()) ||
                curentDate.getMonth() < displayedDate.getMonth()
            )
                if (selectedDate.start == 0) {
                    selectedDate.start = new Date();

                    selectedDate.start.setDate(Number(el.textContent));
                    selectedDate.start.setMonth(displayedDate.getMonth());
                    selectedDate.start.setFullYear(displayedDate.getFullYear());
                } else if (selectedDate.start != 0 && selectedDate.end == 0) {
                    if (
                        selectedDate.start.getMonth() ==
                        displayedDate.getMonth()
                    ) {
                        if (el.textContent > selectedDate.start.getDate()) {
                            selectedDate.end = new Date();

                            selectedDate.end.setDate(Number(el.textContent));
                            selectedDate.end.setMonth(displayedDate.getMonth());
                            selectedDate.end.setFullYear(
                                displayedDate.getFullYear()
                            );
                        } else {
                            selectedDate.end = new Date(selectedDate.start);

                            selectedDate.start.setDate(Number(el.textContent));
                            selectedDate.start.setMonth(
                                displayedDate.getMonth()
                            );
                            selectedDate.start.setFullYear(
                                displayedDate.getFullYear()
                            );
                        }
                    } else {
                        if (
                            selectedDate.start.getMonth() <
                            displayedDate.getMonth()
                        ) {
                            selectedDate.end = new Date();

                            selectedDate.end.setDate(Number(el.textContent));
                            selectedDate.end.setMonth(displayedDate.getMonth());
                            selectedDate.end.setFullYear(
                                displayedDate.getFullYear()
                            );
                        } else {
                            selectedDate.end = new Date(selectedDate.start);

                            selectedDate.start.setDate(Number(el.textContent));
                            selectedDate.start.setMonth(
                                displayedDate.getMonth()
                            );
                            selectedDate.start.setFullYear(
                                displayedDate.getFullYear()
                            );
                        }
                    }
                }

            drawCal();

            if (inputBoxes.length != 0) {
                if (selectedDate.start != 0) {
                    inputBoxes[0].value = "";
                    if (selectedDate.start.getDate() < 10)
                        inputBoxes[0].value += `0${selectedDate.start.getDate()}.`;
                    else
                        inputBoxes[0].value += `${selectedDate.start.getDate()}.`;

                    if (selectedDate.start.getMonth() < 10)
                        inputBoxes[0].value += `0${
                            selectedDate.start.getMonth() + 1
                        }.`;
                    else
                        inputBoxes[0].value += `${
                            selectedDate.start.getMonth() + 1
                        }.`;

                    inputBoxes[0].value += `${selectedDate.start.getFullYear()}`;
                }

                if (selectedDate.end != 0) {
                    inputBoxes[1].value = "";
                    if (selectedDate.end.getDate() < 10)
                        inputBoxes[1].value += `0${selectedDate.end.getDate()}.`;
                    else
                        inputBoxes[1].value += `${selectedDate.end.getDate()}.`;

                    if (selectedDate.end.getMonth() < 10)
                        inputBoxes[1].value += `0${
                            selectedDate.end.getMonth() + 1
                        }.`;
                    else
                        inputBoxes[1].value += `${
                            selectedDate.end.getMonth() + 1
                        }.`;

                    inputBoxes[1].value += `${selectedDate.end.getFullYear()}`;
                }
            }

            if (inputBox) {
                if (selectedDate.start != 0) {
                    inputBox.value = `${selectedDate.start.getDate()} ${monthInf[
                        selectedDate.start.getMonth()
                    ].name
                        .substring(0, 3)
                        .toLowerCase()}`;
                }
                if (selectedDate.end != 0) {
                    inputBox.value += ` - ${selectedDate.end.getDate()} ${monthInf[
                        selectedDate.end.getMonth()
                    ].name
                        .substring(0, 3)
                        .toLowerCase()} 
                    `;
                }
            }
        });
    });
}

// function countDays() {
//     return Math.ceil(
//         (selectedDate.end.getTime() - selectedDate.start.getTime()) /
//             (1000 * 60 * 60 * 24)
//     );
// }

// function getCost() {}

if (table) setUp();
