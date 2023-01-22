let dayElm = document.querySelector(".Day")
let timeElm = document.querySelector(".Time")
let doBlink = false
function updateUI() {
    let date = Date()
    let day = date.slice(4, 15)
    let time = date.slice(16, 24)
    time = time.split(":")
    dayElm.innerHTML = day
    if (doBlink) {
        timeElm.innerHTML = `${time[0]} ${time[1]} ${time[2]}`
    }
    else {
        timeElm.innerHTML = `${time[0]}:${time[1]}:${time[2]}`
    }
    doBlink = !doBlink
}
setInterval(updateUI, 500)