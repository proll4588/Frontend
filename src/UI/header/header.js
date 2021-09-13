const munuBtn = document.querySelector(".header__menu-btn");
const munu = document.querySelector(".header__interface");

if (munuBtn) {
    munuBtn.addEventListener("click", () => {
        if (munu) {
            munu.classList.toggle("header__interface_active");
        }

        if (munu.classList.contains("header__interface_active")) {
            munuBtn.innerHTML = "close";
        } else {
            munuBtn.innerHTML = "menu";
        }
    });
}
