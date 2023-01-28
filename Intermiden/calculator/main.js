let formula = ""
let inputplace = ""
let userInput = ""
let openBarkets = 0
const Code = [
    ")", "!", "C", "Del",
    "(", "²", "²√(", "/",
    7, 8, 9, "x",
    4, 5, 6, "-",
    1, 2, 3, "+",
    "∓", 0, ".", "="
]
const numbs = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]

const NoneInterupting = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "∓", "Del"]
const Interupting = [")", "!", "(", "²", "²√(", "/", "x", "-", "+"]

const FormulaElm = document.querySelector(".formula")
const InputPlaceElem = document.querySelector(".enter_result")
const Operation = ["/", "x", "-", "+"/*, "!"*/]
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
        //for deleting the - sigh if it exist just for cheking the Zero
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
        // firstOfLastSqrtS = firstInS ? formula.length : firstOfLastSqrtS
        // firstInS = false
        // if (addedOpperation || formula.length == 0) {
        //     addedOpperation = false
        //     formula += `²√(${inputplace !== "" ? inputplace : "0"})`
        //     inputplace = ""
        // }
        // else {
        //     if (inputplace === "") {
        //         formula = `${formula.slice(0, firstOfLastSqrtS)}²√(${formula.slice(firstOfLastSqrtS)})`
        //     }
        //     else {
        //         formula = formula.slice(0, firstOfLastSqrtS)
        //         inputplace = ""
        //     }
        // }
    }
    else if (Operation.includes(input)) {
        console.log(input, inputplace)

        if (inputplace === "") {
            // for empty formula 'expretion"
            if (formula === "" && (["/", "x"].includes(input) || input === "+")) {
                return
            }
            else if (formula.length === 1 && formula.charAt(0) === "-" && input === "+") {
                formula = ""
                return
            }
            // change the latest operation || adding it
            if (["/", "x", "-", "+"].includes(formula.charAt(formula.length - 1))) {
                formula = formula.slice(0, formula.length - 1) + input
            }
            else {
                formula += input
            }
        }
        else { // if no operation is set before puting a num all will be deleted
            if (formula.charAt(formula.length - 1) === ")") {
                formula = "" /*formula.slice(0, firstOfLastSqrtS)*/
            }
            formula += inputplace + input
            inputplace = ""
        }
    }
    else if (["(", ")"].includes(input)) {
        if (input === "(") {
            if (formula.charAt(formula.length - 1) === ")") {
                formula = ""
            }
            formula += input
            openBarkets++
        }
        else if (openBarkets > 0) { // bracket closes ")")
            if (["/", "x", "-", "+"].includes(formula.charAt(formula.length - 1)) && inputplace === "") {
                formula = formula.slice(0, formula.length - 1)
            }
            formula += inputplace + input
            inputplace = ""
            openBarkets--
        }
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




formula = "2.33356x(9--9+6)x9.024/((8-9)x(6+3))+-3x(-6.5/9)"
calculate(formula)
function calculate(formulaToCalculate) {
    /*
    1) Brakets ()  "array"
    2) multiplication and Divition take the sing of it 
    3) sum and difrence
    */
    let OrderOfOperation = []
    let nothingFound = true;
    let BraketsNum = 0
    let inBraket = false
    let workingExpretion = ""
    // working formula "2.33356x(9--9+6)x9.024/((8-9)x(6+3))+-3x(-6.5/9)"
    // // console.log(parseBrakets("2.33356x(9--9)x9.024/((8-9)x6)+-3x(-6.5/9)"))
    // ['9--9|8:13', '(8-9)x6|21:29', '-6.5/9|34:41']
    OrderOfOperation = OrderOfOperation.reverse()
    for (elem of OrderOfOperation) {
        replaceByIndex(elem, calExpretion(elem.split("|")[0]))
    }



    replaceByIndex(OrderOfOperation)
    function parseBrakets(formulaToParse) {
        nothingFound = true
        let localOrderOfOperation = []
        let startIndex = 0
        for (let i = 0; i < formulaToParse.length; i++) {
            const character = formulaToParse[i]
            if (character === "(") {
                if (BraketsNum === 0) {
                    startIndex = i
                }
                inBraket = true
                BraketsNum++
                nothingFound = false
            }
            else if (character === ")") {
                BraketsNum--
                if (BraketsNum == 0) {
                    inBraket = false
                    workingExpretion += character

                }
            }
            if (inBraket) {
                workingExpretion += character
            }
            else if (!inBraket && workingExpretion !== "") {
                localOrderOfOperation.push(`${workingExpretion.slice(1, workingExpretion.length - 1)}|${startIndex}:${i}`)
                workingExpretion = ""
            }
        }
        return localOrderOfOperation
    }

    OrderOfOperation = parseBrakets(formula)
    for (let i = 0; i < OrderOfOperation.length; i++) {
        const expretion = OrderOfOperation[i]
        if (expretion.includes("(")) {
            let arrayToConcat = parseBrakets(expretion)
            for (let j = 0; j < arrayToConcat.length; j++) {
                arrayToConcat[j] += `|${i}`
            }
            OrderOfOperation.concat(arrayToConcat)
        }
    }
    OrderOfOperation.reverse()

    for (expretion of OrderOfOperation) {
        let devlopedExpretion = expretion.split("|")

    }


    //3+-56x-97--5/8
    function calExpretionByOreder(expr) {
        let multiplication_Divition_Part = true
        let minusFound = false
        let num1 = ""
        let numOfStepsBack = 0
        let numOfStepsForw = 0
        let num2 = ""

        for (let i = 0; i < expr.length; i++) {
            const char = expr[i];
            if (multiplication_Divition_Part) {
                if (["x", "/"].includes(char)) {
                    oprIndex = i
                    curentChar = expr.charAt(oprIndex - 1)
                    while (!["/", "x", "+"/*, "!"*/].includes(curentChar)) {
                        numOfStepsBack++
                        curentChar = expr.charAt(oprIndex - 1 - numOfStepsBack)
                        if (curentChar === "-") {
                            minusFound = true
                        }
                        if (minusFound && Operation.includes(curentChar)) {
                            numOfStepsBack--
                            break
                        }
                    }
                    while (!["/", "x", "+"/*, "!"*/].includes(curentChar)) {
                        numOfStepsForw++
                    }
                }
            }
        }
        num1 += expr.slice()
    }



    // the function calculate any two number
    //ex : "3+5"
    function calExpretion(expr) { // "58+42"

        num1 = ""
        num2 = ""
        curentoperation = 0
        for (let i = 0; i < expr.length; i++) {
            const char = expr[i];
            if (Operation.includes(char)) {
                curentoperation = char
            }
            else if (numbs.includes(char)) {
                if (curentoperation === 0)
                    num1 += char
                else
                    num2 += char
            }
        }
        num1 = parseFloat(num1)
        num2 = parseFloat(num2)
        switch (curentoperation) {
            case "/":
                if (num2 === 0)
                    return "0 divition error"
                else
                    return num1 / num2
            case "*":
                return num1 * num2
            case "-":
                return num1 - num2
            case "+":
                return num1 + num2
        }
    }

    function replaceByIndex(ExpretionToReplace, replacement) {
        const posToReplace = ExpretionToReplace.split("|")[1]
        const posArray = posToReplace.split(":")
        posArray = [parseInt(posArray[0]), parseInt(posArray[1])]
        formula = formula.slice(0, posArray[0]) +
            replacement +
            formula.slice(posArray[1], formula.length)
    }
}
