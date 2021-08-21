const inputs = document.querySelectorAll(".date-dropdown__input");
const arrows = document.querySelectorAll(".date-dropdown__arrow");

const calendar = document.querySelector(".date-dropdown__calendar");

if (inputs && calendar && arrows) {
    inputs.forEach((el) => {
        el.addEventListener("click", () => {
            calendar.classList.toggle("date-dropdown__calendar_invis");
        });
    });

    arrows.forEach((el) => {
        el.addEventListener("click", () => {
            calendar.classList.toggle("date-dropdown__calendar_invis");
        });
    });
}
