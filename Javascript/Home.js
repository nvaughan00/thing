function start() {
    let x = document.createTextNode("PLACEHOLDER IN JS");
    document.getElementById("weeklyStats").appendChild(x);

    const url = 'http://localhost:8080/login';

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data[0]))
        .catch(err => alert(err));

}