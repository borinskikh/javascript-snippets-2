console.log('Task 2:');
document.getElementById('main').appendChild(getTask2());

function getTask2() {
    const jsonString =
        `{
    "list": [
    {
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
    },
    {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
    }
    ]
    }`;
    const jsObject = JSON.parse(jsonString);
    const output = document.createElement('div');
    output.setAttribute('id', 'task2');
    output.innerHTML = '<h3>task 2</h3>';
    output.innerHTML += '<p>' + JSON.stringify(jsObject, null, 4); + '</p>';
    console.log(jsObject);
    return output;
}