const rightSide = document.querySelector(".side-right"),
    leftSide = document.querySelector(".side-left"),
    allLeft = document.querySelector(".left-to-all"),
    checkedLeft = document.querySelector(".left-to-checked"),
    allRight = document.querySelector(".right-to-all"),
    checkedRight = document.querySelector(".right-to-checked");
const left_side = [
    {name: "test_1", checked: false},
    {name: "test_2", checked: false},
    {name: "test_3", checked: false},
    {name: "test_4", checked: false}
]
const right_side = [
    {name: "test_5", checked: false},
    {name: "test_6", checked: false},
    {name: "test_7", checked: false},
    {name: "test_8", checked: false}
]
function render(){
    if (right_side.length === 0){
        allLeft.disabled = true
        checkedLeft.disabled = true
    }else {
        allLeft.disabled = false
        checkedLeft.disabled = false
    }

    if (left_side.length === 0){
        allRight.disabled = true
        checkedRight.disabled = true
    }else {
      allRight.disabled = false
      checkedRight.disabled = false
    }
    rightSide.innerHTML = "";
    leftSide.innerHTML = "";
    left_side.forEach((item, index) =>{
        const itemDiv = document.createElement("div"),
            itemInp = document.createElement("input"),
            itemLabel = document.createElement("label");
        itemDiv.classList.add("item");
        itemInp.type = "checkbox";
        itemInp.checked = item.checked;
        itemInp.addEventListener("click", () => {
            item.checked = !item.checked;
            render();
        })
        itemLabel.textContent = item.name;
        itemDiv.appendChild(itemInp);
        itemDiv.appendChild(itemLabel);
        leftSide.appendChild(itemDiv);
    })

    right_side.forEach((item, index) =>{
        const itemDiv = document.createElement("div"),
            itemInp = document.createElement("input"),
            itemLabel = document.createElement("label");
        itemDiv.classList.add("item");
        itemInp.type = "checkbox";
        itemInp.checked = item.checked;
        itemInp.addEventListener("click", () => {
            item.checked = !item.checked;
            render();
        })
        itemLabel.textContent = item.name;
        itemDiv.appendChild(itemInp);
        itemDiv.appendChild(itemLabel);
        rightSide.appendChild(itemDiv);
    })
}
allRight.addEventListener("click", () => {
    const left_side_all_num = left_side.length;
    for (let i = 0; i < left_side_all_num; i++) {
        right_side.push(left_side[0]);
        left_side.shift()
    }
    render()
})
allLeft.addEventListener("click", () => {
    const right_side_all_num = right_side.length
    for (let i = 0; i < right_side_all_num; i++) {
        left_side.push(right_side[0]);
        right_side.shift()
    }
    render()
})
checkedRight.addEventListener("click", () => {
    for (let i = 0; i < left_side.length; i++) {
        if (left_side[i].checked){
            left_side[i].checked = false;
            right_side.push(left_side[i]);
            left_side.splice(i, 1);
            i--;
        }
    }
    render()
})
checkedLeft.addEventListener("click", () => {
    for (let i = 0; i < right_side.length; i++) {
        if (right_side[i].checked){
            right_side[i].checked = false;
            left_side.push(right_side[i]);
            right_side.splice(i, 1);
            i--;
        }
    }
    render()
})
render()