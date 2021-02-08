(() => {
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
    console.log('Task 2:');
    console.log(jsObject);
    document.getElementById('main').appendChild(output);
})();