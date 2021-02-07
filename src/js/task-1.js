document.getElementById('main').appendChild(getTask());

function getTask() {
    const xmlString =
        `<list>
    <student>
        <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
    </list>`;

    const xmlDOM = new DOMParser().parseFromString(xmlString, 'text/xml');
    const students = xmlDOM.getElementsByTagName('student');
    const list = [];
    for (student of students) {
        const nameFirst = student.querySelector('first').textContent;
        const nameSecond = student.querySelector('second').textContent;
        list.push({
            name: nameFirst + ' ' + nameSecond,
            age: Number(student.querySelector('age').textContent),
            prof: student.querySelector('prof').textContent,
            lang: student.querySelector('name').getAttribute('lang').textContent,
        });
    }
    const result = { list: list };
    const output = document.createElement('div');
    output.setAttribute('id', 'task-1');
    output.innerHTML = '<h3>task-1</h3>';
    output.innerHTML += '<p>' + JSON.stringify(result, null, 4); + '</p>';
    console.log('Task 1:\n')
    console.log(result);
    return output;
}