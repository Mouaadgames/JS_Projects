let formula = ""
let inputplace = ""
let userInput = ""
const Code = [
    ")", "!", "C", "Del",
    "(", "²", "²√(", "/",
    7, 8, 9, "x",
    4, 5, 6, "-",
    1, 2, 3, "+",
    "∓", 0, ".", "="
]
const NoneInterupting = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "∓", "Del"]
const Interupting = [")", "!", "(", "²", "²√(", "/", "x", "-", "+"]

const FormulaElm = document.querySelector(".formula")
const InputPlaceElem = document.querySelector(".enter_result")
function keyPress(key) {
    userInput = Code[key]
    if (NoneInterupting.includes(userInput)) {
        addToInputPlace(userInput)
    }
    else if (Interupting.includes(userInput)) {
        addToFormula(userInput)
    }
    else if (userInput === "C") {
        clear()
    }
    else {
        calculate()
    }
    updateUI()
}

function addToInputPlace(input) {
    if (input === "Del") {
        inputplace = inputplace.slice(0, -1)
    }
    else if (input === "∓") {
        if (inputplace[0] === "-") {
            inputplace = inputplace.slice(1)
        }
        else {
            inputplace = `-${inputplace}`
        }
    }
    else {
        //for del the - sigh if it exist just for cheking the Zero
        let hasMinus = inputplace[0] === "-"
        let check = hasMinus ? inputplace.slice(1) : inputplace
        if (check.length === 1 && check[0] === "0") {
            if (!(input === 0) && !(input === ".")) {
                inputplace = hasMinus ? `-${String(input)}` : String(input)
            }
            else if ((input === ".")) {
                inputplace += String(input)
            }
        }
        else if (!((input === ".") && inputplace.includes("."))) {
            if (input === "." && check.length === 0) {
                inputplace += "0"
            }
            inputplace += String(input)
        }
    }
}
let addedOpperation = true
let firstOfLastSqrtS = 0
let firstInS = true
function addToFormula(input) {
    if (input === "²√(") {
        firstOfLastSqrtS = firstInS ? formula.length : firstOfLastSqrtS
        firstInS = false
        if (addedOpperation || formula.length == 0) {
            addedOpperation = false
            formula += `²√(${inputplace !== "" ? inputplace : "0"})`
            inputplace = ""
        }
        else {
            if (inputplace === "") {
                formula = `${formula.slice(0, firstOfLastSqrtS)}²√(${formula.slice(firstOfLastSqrtS)})`
            }
            else {
                formula = formula.slice(0, firstOfLastSqrtS)
                inputplace = ""
            }
        }
    }
    else if (["/", "x", "-", "+", "!"].includes(input)) {
        console.log(input, inputplace,)
        if (inputplace === "") {
            if (["/", "x", "-", "+"].includes(formula.charAt(formula.length - 1))) {
                formula = formula.slice(0, formula.length - 1) + input
            }
        }
        else {
            if (formula.charAt(formula.length - 1) === ")") {
                formula = formula.slice(0, firstOfLastSqrtS)
            }
            formula += inputplace + input
            inputplace = ""
        }
    }
    else {

    }
}

function updateUI() {
    InputPlaceElem.innerHTML = inputplace
    FormulaElm.innerHTML = formula
}
function clear() {
    formula = ""
    inputplace = ""
    userInput = ""
}
function calculate() {
    //
}

function add() {
}
function add() {
}
function add() {
}
function add() {
}

function add() {
}
function add() {
}
function add() {
}
function add() {
}

function add() {
}
function add() {
}