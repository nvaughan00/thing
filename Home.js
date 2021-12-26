function start() {
    getGoal();
}

function getGoal() {
    let goal = [];
    let url = `http://localhost:8080/${username}/getGoal`
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => goal = response.json())
    .catch(err => alert(err));

    alert(goal);
    printAndCompareGoal(goal)
}

function printAndCompareGoal(goal) {
    let cals = runningTotals.calories / goal.calories
    let protein = runningTotals.protein / goal.protein
    let fat = runningTotals.fat / goal.fat
    let carbs = runningTotals.carbs / goal.carbs

    let append = document.createElement("p");
        append.innerHTML = "Daily Calories: "+cals+"%"+
                           "Daily Protein: "+protein+"%\n"+
                           "Daily Fat: "+fat+"%\n"+
                           "Daily Carbs: "+carbs+"%\n"

    if(!document.getElementById("dailyStats").hasChildNodes()) {
        document.getElementById("dailyStats").appendChild(append);
    }
    else {
        document.getElementById("dailyStats").replaceChild(append, document.getElementById("dailyStats").childNodes[0]);
    }
}