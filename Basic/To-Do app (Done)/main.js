let tasks = []
let doneTasks = []
//Hander the button click and add the task to the task Array and Update the UI
function buttonClick() {
    let task = document.querySelector(".inTask").value
    if (task !== "") {
        tasks.push(task)
        updateUI()
    }
}
//Del all the previes task an Loop over the existing ones
function updateUI() {
    let tasksHolder = document.querySelector(".tasksHolder")
    let doneTasksHolder = document.querySelector(".doneTasks")
    tasksHolder.innerHTML = ""
    doneTasksHolder.innerHTML = ""
    document.querySelector(".inTask").value = ""
    tasks.forEach((task, i) => {
        let taskElm = document.createElement("div")
        taskElm.className = "taskRow"
        taskElm.innerHTML = `<li>${task}</li> <button onClick = 'markDone(${i})'>✔</button> <button onClick = 'removeTask(${i})'>💣</button>`
        tasksHolder.appendChild(taskElm)
    })
    doneTasks.forEach((task, i) => {
        let taskElm = document.createElement("div")
        taskElm.className = "doneTaskRow"
        taskElm.innerHTML = `<li>${task}</li> <button style="grid-column: 2/4; " onClick = 'removeTaskFromDone(${i})'>💣</button>`
        doneTasksHolder.appendChild(taskElm)
    })
}
//handel botton click and edit data of the Array
function markDone(index) {
    doneTasks.push(tasks.splice(index, 1))
    updateUI()
}
function removeTask(index) {
    tasks.splice(index, 1)
    updateUI()
}
function removeTaskFromDone(index) {
    doneTasks.splice(index, 1)
    updateUI()
}