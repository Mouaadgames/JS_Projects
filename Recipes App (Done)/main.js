let recipes = ["this is recipe 1",
    "do tow think in the same time",
    "this is recipe 3"]

let par = document.querySelector(".para")
function switchTo(index) {
    par.innerHTML = recipes[index]
}