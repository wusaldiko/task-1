const timerEl = document.getElementById("timer")

const timeFromLocalStorage = localStorage.getItem("time")

if (!timeFromLocalStorage) {
    const hours = +prompt("hours", "0")
    const minutes = +prompt("minutes", "0")
    const seconds = +prompt("seconds", "0")
    start(hours, minutes, seconds)
} else {
    start(...JSON.parse(timeFromLocalStorage))
}

function start() {
    const time = Array.from(arguments)

    time.forEach((t, i, arr) => {
        if (t < 0 || t > 60) {
            throw new Error(`Error! ${t} lest than 0`)
        }
        if (t == 0 && i == 2) {
            if (arr[1] == 0) {
                if (arr[0] == 0) {
                    return start(hours, minutes, seconds + 1)
                }
                arr[0] = arr[0] - 1
                arr[2] = 60
            } else {
                arr[1] = arr[1] - 1
                arr[2] = 60
            }
        }
    })

    timerEl.innerHTML = time.join(":")
    localStorage.setItem("time", JSON.stringify(time))

    setTimeout(() => {
        start(time[0], time[1], time[2] - 1)
    }, 1000)
}


