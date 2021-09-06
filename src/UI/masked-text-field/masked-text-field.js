const input = document.querySelector(".masked-text-field__input");
var isLastDot = false;
var pastLen = 0;

if (input) {
    // input.onkeyup = () => {

    // };

    input.oninput = () => {
        input.value = input.value.replace(/[^\d\.]/g, "");
        var text = input.value;

        input.value = isError(isError(text));
    };
}

function dayIsCorrect(text) {
    return (
        (Number(text) >= 0 && Number(text) <= 3) ||
        (Number(text) >= 10 && Number(text) <= 31)
    );
}

function monthIsCorrect(text) {
    return (
        (Number(text) >= 0 && Number(text) <= 1) ||
        (Number(text) >= 10 && Number(text) <= 12)
    );
}

function isError(text) {
    if (text[text.length - 1] != "." && pastLen > text.length && isLastDot) {
        text = text.substring(0, text.length - 1);
    }

    if (text[text.length - 1] == ".") {
        isLastDot = true;
    } else {
        isLastDot = false;
    }

    pastLen = text.length;

    // console.log(text);

    var content = [];
    var textPart = "";
    for (var i = 0; i < text.length; i++) {
        if (text[i] != ".") {
            textPart += text[i];
        } else {
            content.push(textPart);
            textPart = "";
        }
    }
    content.push(textPart);

    content = content.map((el, id) => {
        if (id == 0 || id == 1) {
            el = String(el).substring(0, 2);
        }

        if (id == 2) {
            el = String(el).substring(0, 4);
        }

        switch (id) {
            case 0:
                if (!dayIsCorrect(el)) {
                    if (el.length == 1) {
                        el = "";
                    } else {
                        if (Number(el) > 31) {
                            el = el.substring(0, 1);
                        }
                    }
                }

                break;
            case 1:
                if (!monthIsCorrect(el)) {
                    if (el.length == 1) {
                        el = "";
                    } else {
                        if (Number(el) > 12) {
                            el = el.substring(0, 1);
                        }
                    }
                }
                break;
        }

        return el;
    });

    // console.log(content);

    var strOut = "";

    content.forEach((el, id) => {
        if (id == 3) {
            return;
        }

        if (id != 0) {
            strOut += ".";
        }

        strOut += el;

        // if (id != 2) {
        //     strOut += ".";
        //     isLastDot = true;
        // }

        if (content.length - 1 == id) {
            if (id == 0 || id == 1) {
                if (el.length == 2) {
                    strOut += ".";
                    isLastDot = true;
                }
            }
        }
    });

    // console.log(isLastDot);

    return strOut;
}
