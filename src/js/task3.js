document.getElementById('main').appendChild(getTask());

/*if (window.localStorage.getItem('task3-cards')) {
    document.getElementById('task3-cards').innerHTML = window.localStorage.getItem('task3-cards');
    console.log('Task 3: local storage was used');
} else {
    document.getElementById('task3-input').value = '3';;
    submit3();
}*/

function getTask() {
    const task = document.createElement('div');
    task.setAttribute('id', 'task3');
    task.setAttribute('class', 'task d-flex flex-column');
    task.innerHTML = '<h3>task 3</h3>';
    const content = document.createElement('div');
    content.setAttribute('id', 'task3-content');
    content.setAttribute('class', 'd-flex flex-fill flex-row');
    const form = document.createElement('form');
    form.setAttribute('id', 'task3-form');
    form.setAttribute('class', 'm-5 d-flex flex-column');
    form.setAttribute('style', 'width: 20%;');
    const field = document.createElement('div');
    field.setAttribute('id', 'task3-field');
    field.setAttribute('class', 'd-flex flex-column');
    const input = document.createElement('input');
    input.setAttribute('type', 'cardTitle');
    input.setAttribute('id', 'task3-input');
    input.setAttribute('class', 'input');
    input.setAttribute('placeholder', ' Enter number');
    const label = document.createElement('label');
    label.setAttribute('class', 'cardTitle');
    label.innerHTML = 'Enter a number between 1 and 10';
    label.setAttribute('for', 'task3-input');
    const button = document.createElement('button');
    button.innerHTML = 'Submit';
    button.setAttribute('class', 'm-3 btn btn-dark');
    button.setAttribute('id', 'task3-button');
    button.onclick = () => submit3();
    //button.addEventListener('click', event => submit3());
    const cards = document.createElement('div');
    cards.setAttribute('id', 'task3-cards');
    cards.setAttribute('class', 'd-flex flex-row flex-wrap');
    cards.setAttribute('style', 'width: 80%;');

    task.appendChild(content);
    content.appendChild(form);
    form.appendChild(field);
    field.appendChild(label);
    field.appendChild(input);
    form.appendChild(button);
    content.appendChild(cards);
    return task;
}

function submit3() {
    const number = parseInt(document.getElementById('task3-input').value);
    clearInput();
    if (!isNaN(number) && number < 11 && number > 0) {
        showMessage('loading');
        request('https://picsum.photos/v2/list/?limit=' + number);
    } else {
        clearChildren(document.getElementById('task3-cards'));
        showMessage('число вне диапазона от 1 до 10');
    }
}

function request(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log('status: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            console.log('Task 3');
            console.log(result);
            displayResults(result);
        }
    };
    xhr.onerror = function () {
        console.log('Error! status: ', xhr.status);
    };
    xhr.send();
};
function displayResults(json) {
    clearChildren(document.getElementById('task3-cards'));
    const cards = document.getElementById('task3-cards');
    json.forEach((item) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'm-2 card bg-dark');
        const image = document.createElement('img');
        image.setAttribute('src', item.download_url);
        image.setAttribute('class', 'card-img-top');
        image.setAttribute('style', 'height: 100px;');
        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');
        const cardTitle = document.createElement('p');
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.innerHTML = item.author;
        card.appendChild(image);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cards.appendChild(card);
    });
    window.localStorage.setItem("task3-cards", document.getElementById('task3-cards').innerHTML);
}

function clearChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function clearInput() {
    document.getElementById('task3-input').value = '';
}

function showMessage(message) {
    const messageNode = document.createElement('p');
    messageNode.setAttribute('class', 'cardTitle');
    messageNode.appendChild(document.createTextNode(message));
    document.getElementById('task3-cards').appendChild(messageNode);
}
