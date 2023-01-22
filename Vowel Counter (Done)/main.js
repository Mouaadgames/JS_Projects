let numHolder = document.querySelector(".numPlace")
const Vowels = ["a", "e", "u", "i", "o", "y"]
setInterval(() => {
    let counter = 0
    let mainInput = document.querySelector(".sentence").value.toLowerCase()
    for (let i = 0; i < mainInput.length; i++) {
        const leter = mainInput[i];
        if (isAVowle(leter)) {
            counter++
        }
    }
    numHolder.innerHTML = counter
}, 500);

function isAVowle(leter) {
    for (let i = 0; i < Vowels.length; i++) {
        const vowel = Vowels[i];
        if (leter === vowel) {
            return true
        }
    }
    return false
}

