var page = 1;
var allPage = 9;
var container = document.querySelector(".pagination");
if (container) draw();

function nextPage() {
    page++;
}

function draw() {
    container.innerHTML = "";
    var el = [];
    if (allPage < 9) {
        for (var i = 1; i < allPage + 1; i++) {
            if (page == i) {
                el.push(
                    createBtn({
                        className: [
                            "pagination__btn",
                            "pagination__btn_active",
                        ],
                        content: i,
                    })
                );
            } else {
                el.push(
                    createBtn({
                        className: ["pagination__btn"],
                        content: i,
                    })
                );
            }
        }
    } else {
        if (page >= 4) {
            el.push(
                createBtn({
                    className: [
                        "pagination__btn",
                        "pagination__btn_back",
                        "icon-arrow",
                    ],
                    content: "",
                })
            );
        }

        if (page == 1) {
            el.push(
                createBtn({
                    className: ["pagination__btn", "pagination__btn_active"],
                    content: "1",
                })
            );
        } else {
            el.push(
                createBtn({
                    className: ["pagination__btn"],
                    content: "1",
                })
            );
        }

        if (page < 4) {
            for (var i = 2; i < 4; i++) {
                if (page == i) {
                    el.push(
                        createBtn({
                            className: [
                                "pagination__btn",
                                "pagination__btn_active",
                            ],
                            content: i,
                        })
                    );
                } else {
                    el.push(
                        createBtn({
                            className: ["pagination__btn"],
                            content: i,
                        })
                    );
                }
            }

            el.push(
                createBtn({
                    className: ["pagination__btn"],
                    content: "...",
                })
            );
            el.push(
                createBtn({
                    className: ["pagination__btn"],
                    content: allPage,
                })
            );
            el.push(
                createBtn({
                    className: [
                        "pagination__btn",
                        "pagination__btn_next",
                        "icon-arrow",
                    ],
                    content: "",
                })
            );
        }

        if (page >= 4 && page <= allPage - 3) {
            el.push(
                createBtn({
                    className: ["pagination__btn"],
                    content: "...",
                })
            );

            for (var i = page - 1; i < page + 2; i++) {
                if (page == i) {
                    el.push(
                        createBtn({
                            className: [
                                "pagination__btn",
                                "pagination__btn_active",
                            ],
                            content: i,
                        })
                    );
                } else {
                    el.push(
                        createBtn({
                            className: ["pagination__btn"],
                            content: i,
                        })
                    );
                }
            }

            el.push(
                createBtn({
                    className: ["pagination__btn"],
                    content: "...",
                })
            );
            el.push(
                createBtn({
                    className: ["pagination__btn"],
                    content: allPage,
                })
            );
            el.push(
                createBtn({
                    className: [
                        "pagination__btn",
                        "pagination__btn_next",
                        "icon-arrow",
                    ],
                    content: "",
                })
            );
        }

        if (page > allPage - 3) {
            el.push(
                createBtn({
                    className: ["pagination__btn"],
                    content: "...",
                })
            );

            for (var i = allPage - 2; i < allPage + 1; i++) {
                if (page == i) {
                    el.push(
                        createBtn({
                            className: [
                                "pagination__btn",
                                "pagination__btn_active",
                            ],
                            content: i,
                        })
                    );
                } else {
                    el.push(
                        createBtn({
                            className: ["pagination__btn"],
                            content: i,
                        })
                    );
                }
            }
        }
    }
    el.forEach((b) => {
        container.appendChild(b);
    });
}

function createBtn({ className, content }) {
    var el = document.createElement("button");
    className.forEach((clas) => {
        el.classList.add(clas);
    });

    if (className[1] == "pagination__btn_next") {
        el.addEventListener("click", () => {
            page++;
            draw();
        });
    } else if (className[1] == "pagination__btn_back") {
        el.addEventListener("click", () => {
            page--;
            draw();
        });
    } else if (content != "...") {
        el.addEventListener("click", () => {
            page = content;
            draw();
        });
    }

    el.innerHTML = content;

    return el;
}
