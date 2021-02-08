document.getElementById('main').appendChild(getTask3());
submit3();

function getTask3() {
    const output = document.createElement('div');
    output.setAttribute('id', 'task3');
    output.innerHTML = '<h3>task 3</h3>';
    const form = document.createElement('form');
    form.setAttribute('id', 'task3-form');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'task3-input');
    input.value = '3';
    const label = document.createElement('label');
    label.innerHTML = 'Enter a number between 1 and 10<br>';
    label.setAttribute('for', 'task3-input');
    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Submit');
    button.setAttribute('id', 'task3-button');
    const cards = document.createElement('div');
    cards.setAttribute('id', 'task3-cards');
    output.appendChild(form);
    output.appendChild(cards);
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    button.addEventListener('click',
        () => { submit3(); }
    );
    return output;
}

function submit3() {
    const number = parseInt(document.getElementById('task3-input').value);
    clearInput3();
    if (!isNaN(number) && number < 11 && number > 0) {
        showMessage3('loading');
        request3('https://picsum.photos/v2/list/?limit=' + number);
    } else {
        clearChildren(document.getElementById('task3-cards'));
        showMessage3('число вне диапазона от 1 до 10');
    }
}

function request3(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log('status: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            console.log('Task 3');
            console.log(result);
            displayResults3(result);
        }
    };
    xhr.onerror = function () {
        console.log('Error! status: ', xhr.status);
    };
    xhr.send();
};
function displayResults3(json) {
    clearChildren(document.getElementById('task3-cards'));
    const cards = document.getElementById('task3-cards');
    cards.style = 'display: flex; flex-flow: row wrap;';
    json.forEach((item) => {
        const card = document.createElement('div');
        card.style.padding = '10px';
        card.setAttribute('class', 'card');
        const image = document.createElement('img');
        image.setAttribute('src', item.download_url);
        image.style = 'max-width: 100px; max-height: 100px;';
        const text = document.createElement('p');
        text.setAttribute('class', 'card-text');
        text.innerHTML = item.author;
        card.appendChild(image);
        card.appendChild(text);
        cards.appendChild(card);
    });
}

function clearChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function clearInput3() {
    document.getElementById('task3-input').value = '';
}

function showMessage3(message) {
    const text = document.createElement('p');
    text.appendChild(document.createTextNode(message));
    document.getElementById('task3-cards').appendChild(text);
}