const btn = document.querySelector(".like-button__body");
const num = document.querySelector(".like-button__like-num");
var isPresed = false;

if (btn && num) {
    btn.addEventListener("click", () => {
        var n = Number(num.textContent);
        if (isPresed) {
            n--;
        } else {
            n++;
        }
        num.innerHTML = n;
        isPresed = !isPresed;
        console.log(1);
    });
}
