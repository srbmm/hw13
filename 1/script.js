const doingWorks = document.getElementById("doing-works"),
    completedWorks = document.getElementById("completed-works"),
    taskWorks = document.getElementById("tasks-works"),
    greenBackground = document.querySelector(".green"),
    showAbout = document.querySelector(".show-about"),
    container = document.querySelector(".container"),
    aboutData = document.getElementById("about-data"),
    closeAbout = document.getElementById("close-about"),
    todoTitleInput = document.getElementById("todo-title"),
    todoDateInput = document.getElementById("todo-date"),
    todoAddBtn = document.getElementById("add-btn");
let data = localStorage.getItem('hw13');
if (data === null){
    data = [];
}else{
    data = JSON.parse(data)
}
todoAddBtn.addEventListener("click", function (){
    const now = new Date();
    const obj = {
        title: todoTitleInput.value,
        startDate: `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`,
        endDate: todoDateInput.value,
        desc: "test description",
        sit: 0
    }
    data.push(obj);
    localStorage.setItem("hw13", JSON.stringify(data));
    render()
})
function showAboutFunc(data){
    container.classList.add("blur");
    showAbout.classList.remove("display-none");
    greenBackground.classList.remove("display-none");
    aboutData.textContent = data;
}
closeAbout.addEventListener("click", () => {
    console.log()
    container.classList.remove("blur");
    showAbout.classList.add("display-none");
    greenBackground.classList.add("display-none");
})

function render(){
    taskWorks.innerHTML = "";
    doingWorks.innerHTML = "";
    completedWorks.innerHTML = "";
    data.forEach((item, index) => {
        if (item.sit === 0){
            taskWorks.appendChild(makeWorkBox(item, index))
        }
        if (item.sit === 1){
            doingWorks.appendChild(makeWorkBox(item, index))
        }
        if (item.sit === 2){
            completedWorks.appendChild(makeWorkBox(item, index))
        }
    })
}
function makeWorkBox(item, index) {
    const titleClose = document.createElement('div');
    titleClose.classList.add('title-close');
    titleClose.innerHTML = `<h3 class="title">${item.title}</h3>`;
    const closeBtn = document.createElement("button");
    titleClose.appendChild(closeBtn);
    const startTimeP = document.createElement("p");
    startTimeP.innerText = `Start: ${item.startDate}`;
    startTimeP.classList.add('date');
    const endTimeP = document.createElement("p");
    endTimeP.innerText = `End: ${item.endDate}`;
    endTimeP.classList.add('date');
    const minesBtn = document.createElement("button"),
        aboutBtn = document.createElement("button"),
        checkBtn = document.createElement("button"),
    workBtns = document.createElement("div");
    closeBtn.classList.add("close-btn");
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click",() => {
        data.splice(index, 1);
        localStorage.setItem("hw13",JSON.stringify(data));
        render();
    })
    minesBtn.textContent = "-";
    minesBtn.addEventListener("click", () => {
        item.sit = item.sit > 0 ? item.sit-1 : item.sit;
        localStorage.setItem("hw13", JSON.stringify(data));
        render();
    });
    aboutBtn.textContent = "about";
    aboutBtn.addEventListener("click", () => console.log("test"));
    checkBtn.innerHTML = "&#x2714;";
    checkBtn.addEventListener("click", () => {
        item.sit = item.sit < 2 ? item.sit + 1 : item.sit;
        localStorage.setItem("hw13", JSON.stringify(data));
        render();
    });
    workBtns.appendChild(minesBtn);
    workBtns.appendChild(aboutBtn);
    workBtns.appendChild(checkBtn);
    workBtns.classList.add("work-btns");
    const workBox = document.createElement("div");
    workBox.appendChild(titleClose);
    workBox.appendChild(startTimeP);
    workBox.appendChild(endTimeP);
    workBox.appendChild(workBtns);
    workBox.classList.add('work-box');
    return workBox
}
render()