let runningTotals = {calories: 0, protein: 0, carbs: 0, fat: 0};
let date = new Date();
let currentDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
let username = 'SmellyDan' //Update this eventually

function addButton(name, elementId) {
    let leftElement = document.createElement("button");
        leftElement.innerHTML = "-";
        leftElement.type = "button";
        leftElement.name = name+"LftBtn";
        leftElement.style.width = '40px';
        leftElement.style.height = '40px';
        leftElement.style.fontSize = '12px';
        leftElement.style.borderRadius = '20px';
        leftElement.style.position = 'relative';
        leftElement.style.right = '5%';

    let rightElement = document.createElement("button");
        rightElement.innerHTML = "+";
        rightElement.type = "button";
        rightElement.name = name+"LftBtn";
        rightElement.style.width = '40px';
        rightElement.style.height = '40px';
        rightElement.style.fontSize = '12px';
        rightElement.style.borderRadius = '20px';
        rightElement.style.position = 'relative';
        rightElement.style.right = '5%';

    let element = document.createElement("button");
        element.innerHTML = name;
        element.type = "button";
        element.name = name+"Btn";
        element.style.width = '75px';
        element.style.height = '75px';
        element.style.fontSize = '11px';
        element.style.position = 'relative';
        element.style.right = '5%';
        element.style.wordWrap = 'break-word';

    if(elementId === "breakfasts") {
        let x = breakfastFoods.find(s => s.name === name);

        rightElement.onclick = function () {
            addToRunningTotals(x.calories, x.protein, x.carbs, x.fat);
            refreshRunningTotal();
            x.count++;
            refreshCount(x.name+"CNT", x.count);
        };
        leftElement.onclick = function () {
            if(x.count > 0) {
                subtractFromRunningTotals(x.calories, x.protein, x.carbs, x.fat);
                x.count--;
            }
            refreshRunningTotal();
            refreshCount(x.name+"CNT", x.count);
        };
    }

    else if (elementId === "lunches") {
        let x = lunchFoods.find(s => s.name === name);

        rightElement.onclick = function () {
            addToRunningTotals(x.calories, x.protein, x.carbs, x.fat);
            refreshRunningTotal();
            x.count++;
            refreshCount(x.name+"CNT", x.count);
        };
        leftElement.onclick = function () {
            if(x.count > 0) {
                subtractFromRunningTotals(x.calories, x.protein, x.carbs, x.fat);
                x.count--;
            }
            refreshRunningTotal();
            refreshCount(x.name+"CNT", x.count);
        };
    }

    else {
        let x = dinnerFoods.find(s => s.name === name);

        rightElement.onclick = function () {
            addToRunningTotals(x.calories, x.protein, x.carbs, x.fat);
            refreshRunningTotal();
            x.count++;
            refreshCount(x.name+"CNT", x.count);
        };
        leftElement.onclick = function () {
            if(x.count > 0) {
                subtractFromRunningTotals(x.calories, x.protein, x.carbs, x.fat);
                x.count--;
            }
            refreshRunningTotal();
            refreshCount(x.name+"CNT", x.count);
        };
    }

    let count = document.createElement("text");
    count.innerHTML = "0";
    count.id = name+"CNT";

    document.getElementById(elementId).appendChild(leftElement);
    document.getElementById(elementId).appendChild(element);
    document.getElementById(elementId).appendChild(rightElement);
    document.getElementById(elementId).appendChild(count);
    document.getElementById(elementId).appendChild(document.createElement("br"))
}

function refreshCount(elementName, x) {
    if(x < 0) { x = 0; }
    document.getElementById(elementName).innerHTML = x;
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

    if(isNaN(cal)) { cal = 0; }
    if(isNaN(pro)) { pro = 0; }
    if(isNaN(carb)) { carb = 0; }
    if(isNaN(fat)) { fat = 0; }

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
    if(runningTotals.calories < 0) { runningTotals.calories = 0; }
    if(runningTotals.protein < 0) { runningTotals.protein = 0; }
    if(runningTotals.carbs < 0) { runningTotals.carbs = 0; }
    if(runningTotals.fat < 0) { runningTotals.fat = 0; }
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

function subtractFromRunningTotals(calories, protein, carbs, fat) {
    runningTotals.calories -= calories;
    runningTotals.protein -= protein;
    runningTotals.carbs -= carbs;
    runningTotals.fat -= fat;
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

function addGoal() {
    let cal = parseInt(document.getElementById("calGoalInput").value);
    let pro = parseInt(document.getElementById("proteinGoalInput").value);
    let carb = parseInt(document.getElementById("carbGoalInput").value);
    let fat = parseInt(document.getElementById("fatGoalInput").value);

    if(isNaN(cal)) { cal = 0; }
    if(isNaN(pro)) { pro = 0; }
    if(isNaN(carb)) { carb = 0; }
    if(isNaN(fat)) { fat = 0; }

    //Use later
    let goal = {calories: cal, protein: pro, carbs: carb, fat: fat};

    addElementGoal("goalDisplay");

    let url = `http://localhost:8080/${username}/addGoal`

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
                calories: goal.calories,
                protein: goal.protein,
                carbs: goal.carbs,
                fat: goal.fat
            }
        )
    })
    .then(response => console.log(response.json()))
    .catch(err => alert(err));
}

function addElementGoal(elementId) {
    let newElement = document.createElement("h1");
    newElement.id = elementId+"Goal";

    if (!document.getElementById(elementId).hasChildNodes()) {
        newElement.innerHTML = "Goal has been added";
        document.getElementById(elementId).appendChild(newElement);
    }
    else {
        newElement.innerHTML = "Goal has been updated";
        document.getElementById(elementId).replaceChild(newElement, document.getElementById(elementId).childNodes[0]);
    }
}

function addAllFields() {
    addAllBreakfasts();
    addAllLunches();
    addAllDinners();
    getOtherTotalsAndAppend();
    refreshRunningTotal();
}