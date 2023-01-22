let playerSelect
let computerSelect
let result = ""
let you = 0
let they = 0
let showedSelect = [
    "cisors",
    "rock",
    "paper"
]
let resultText = document.querySelector(".score p")
let computerElm = document.querySelector(".opponentPlace button")
function select(s) {
    computerSelect = Math.floor(Math.random() * 3)
    computerElm.innerHTML = showedSelect[computerSelect]
    playerSelect = s
    check()
    resultText.innerHTML = `${you} - ${they}`
}
function check() {
    if (playerSelect === computerSelect) {
        console.log("Draw")
        return
    }
    if (playerSelect === 0 && computerSelect === 2) {
        you++
        console.log("win")
        return
    }
    if (playerSelect === 1 && computerSelect === 0) {
        you++
        console.log("win")
        return
    }
    if (playerSelect === 2 && computerSelect === 1) {
        you++
        console.log("win")
        return
    }
    console.log("lose")
    they++
}
