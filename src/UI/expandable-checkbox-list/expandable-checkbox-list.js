const arrow = document.querySelector(".expandable-checkbox-list__icon");
const body = document.querySelector(".expandable-checkbox-list__body");

if (arrow && body) {
    arrow.addEventListener("click", () => {
        body.classList.toggle("expandable-checkbox-list__body_invis");
        arrow.classList.toggle("expandable-checkbox-list__icon_rot");
    });
}
