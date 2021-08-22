const input = document.querySelector(".filter-date-dropdown__input");
const arrow = document.querySelector(".filter-date-dropdown__arrow");

const calendar = document.querySelector(".filter-date-dropdown__calendar");

if (input && calendar && arrow) {
    input.addEventListener("click", () => {
        calendar.classList.toggle("filter-date-dropdown__calendar_invis");
    });

    arrow.addEventListener("click", () => {
        calendar.classList.toggle("filter-date-dropdown__calendar_invis");
    });
}
