let lastResult = 0;
let isRadians = true;

document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", () => {
        const display = document.getElementById("result");
        const value = button.textContent;

        if (value === "AC") {
            display.value = "0";
        }
        
        else if (value === "C") {
            display.value = display.value.slice(0, -1);
            if (display.value === "") {
                display.value = "0";
            }
        }
        
        else if (value === "Rad" || value === "Deg") {
            isRadians = value === "Rad";
            button.textContent = isRadians ? "Deg" : "Rad";
        }
        
        else if (value === "=") {
            try {
                if(display.value==="Error"){
                    display.value = "0";
                }
                let expression = display.value;

                expression = expression
                    .replace(/÷/g, "/")
                    .replace(/×/g, "*")
                    .replace(/π/g, "Math.PI")
                    .replace(/\be\b/g, "Math.exp")
                    .replace(/√/g, "Math.sqrt")
                    .replace(/\^/g, "**")
                    .replace(/EXP/g, "*10**");


            expression = expression.replace(
                /(sin|cos|tan)\(([^)]+)\)/g,
                (match, func, arg) => {
                    if (!isRadians) {
                        arg = `(${arg} * (Math.PI / 180))`;
                    }
                    return `Math.${func}(${arg})`;
                }
            );


            expression = expression.replace(
                /(log|ln)\(([^)]+)\)/g,
                (match, func, arg) => {
                    return func === "log" ? `Math.log10(${arg})` : `Math.log(${arg})`;
                }
            );

            
            expression = expression.replace(/(\d+)!/g, (match, num) =>
                factorial(Number(num))
            );


            display.value = eval(expression);
            lastResult = display.value;
            } catch {
            display.value = "Error";
            }
        } else if (
            display.value === lastResult ||
            display.value === "Error" ||
            display.value === "undefined" ||
            display.value === "Infinity" ||
            display.value === "-Infinity" ||
            display.value === "NaN" ||
            display.value === "0" ||
            display.value === "0."
        ) {
            display.value = value;
        } else {
            display.value += value;
        }
    });
});


function factorial(n) {
    if (n < 0) return "Error";
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
