let runningTotals = {calories: 0, protein: 0, carbs: 0, fat: 0};
let date = new Date();
let currentDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
let username = 'SmellyDan' //Update this eventually

function addButton(name, elementId) {
    let element = document.createElement("button");
    element.innerHTML = name;
    element.type = "button";
    element.name = name+"Btn";
    element.style.width = '100px';
    element.style.height = '100px';
    element.style.fontSize = '22px';
    if(elementId === "breakfasts") {
        element.onclick = function () {
            let x = breakfastFoods.find(s => s.name === name);
            addToRunningTotals(x.calories, x.protein, x.carbs, x.fat);
            element.style.backgroundColor = "lightGreen";
            refreshRunningTotal();
            x.count++;
            
        };
    }
    else if (elementId === "lunches") {
        element.onclick = function () {
            let x = lunchFoods.find(s => s.name === name);
            addToRunningTotals(x.calories, x.protein, x.carbs, x.fat);
            element.style.backgroundColor = "lightGreen";
            refreshRunningTotal();
            x.count++;
        };
    }
    else {
        element.onclick = function () {
            let x = dinnerFoods.find(s => s.name === name);
            addToRunningTotals(x.calories, x.protein, x.carbs, x.fat);
            element.style.backgroundColor = "lightGreen";
            refreshRunningTotal();
            x.count++;
        };
    }
    document.getElementById(elementId).appendChild(element);
}

function getOtherTotalsAndAppend() {
    let url = `http://localhost:8080/${username}/${currentDate}/mealOther`

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => console.log(response.json()))
        .catch(err => alert(err));
}


function addOther() {
    let name = document.getElementById("nameInput").value;
    let cal = parseInt(document.getElementById("calInput").value);
    let pro = parseInt(document.getElementById("proteinInput").value);
    let carb = parseInt(document.getElementById("carbInput").value);
    let fat = parseInt(document.getElementById("fatInput").value);

    let food = {name: name, calories: cal, protein: pro, carbs: carb, fat: fat, count: 1};

    otherFoods.push(food);
    addToRunningTotals(cal, pro, carb, fat);

    refreshRunningTotal();
    addOtherToListDisplay(food);

    let url = `http://localhost:8080/${username}/${currentDate}/addMealOther`

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
                name: food.name,
                calories: food.calories,
                protein: food.protein,
                carbs: food.carbs,
                fat: food.fat
            }
        )
    })
    .then(response => console.log(response.json()))
    .catch(err => alert(err));
}

function addOtherToListDisplay(food) {
    let element = document.createElement("li");
    element.innerHTML = food.name+" is added";
    document.getElementById("inputListDisplay").appendChild(element);
}

function refreshRunningTotal() {
    let x = document.createTextNode(
        "Calories: "+runningTotals.calories+
        " Protein: "+runningTotals.protein+
        " Carbs: "+runningTotals.carbs+
        " Fats: "+runningTotals.fat
    );
    if(!document.getElementById("runningTotalDisplay").hasChildNodes()) {
        document.getElementById("runningTotalDisplay").appendChild(x);
    }
    else {
        document.getElementById("runningTotalDisplay").replaceChild(x, document.getElementById("runningTotalDisplay").childNodes[0])
    }
}
function addToRunningTotals(calories, protein, carbs, fat) {
    runningTotals.calories += calories;
    runningTotals.protein += protein;
    runningTotals.carbs += carbs;
    runningTotals.fat += fat;
}

function addAllBreakfasts() {
    for(let i = 0; i < breakfastFoods.length; i++) {
        addButton(breakfastFoods[i].name, "breakfasts");
    }
}
function addAllLunches() {
    for(let i = 0; i < lunchFoods.length; i++) {
        addButton(lunchFoods[i].name, "lunches");
    }
}
function addAllDinners() {
    for(let i = 0; i < dinnerFoods.length; i++) {
        addButton(dinnerFoods[i].name, "dinners");
    }
}
function addAllFields() {
    addAllBreakfasts();
    addAllLunches();
    addAllDinners();
    getOtherTotalsAndAppend();
}