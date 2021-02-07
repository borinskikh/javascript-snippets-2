document.getElementById('main').appendChild(getTask());

function getTask() {
    const output_3 = document.createElement('div');
    output_3.setAttribute('id', 'task-3');
    output_3.innerHTML = '<h3>task-3</h3>';
    const form = document.createElement('form');
    form.setAttribute('id', 'form');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'input');
    const label = document.createElement('label');
    label.innerHTML = 'Enter a number between 1 and 10<br>';
    label.setAttribute('for', 'input');
    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Submit');
    button.setAttribute('id', 'button');
    const cards = document.createElement('div');
    cards.setAttribute('id', 'cards');
    output_3.innerHTML = '<h3>task-3</h3>';
    output_3.appendChild(form);
    output_3.appendChild(cards);
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    button.addEventListener('click', () => {
        submit();
    });
    return output_3;
}

function submit() {
    const number = parseInt(document.getElementById('input').value);
    if (!isNaN(number) && number < 11 && number > 0) {
        console.log('request');
        request('https://picsum.photos/v2/list/?limit=' + number);
    } else {
        clearChildren(document.getElementById('cards'));
        const errorText = document.createElement('p');
        errorText.appendChild(document.createTextNode('число вне диапазона от 1 до 10'));
        document.getElementById('cards').appendChild(errorText);
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
            displayResult(result);
        }
    };

    xhr.onerror = function () {
        console.log('Error! status: ', xhr.status);
    };

    xhr.send();
};
function displayResult(apiData) {
    clearChildren(document.getElementById('cards'));
    const cards = document.getElementById('cards');
    cards.setAttribute('id', 'cards');
    cards.style = 'display: flex; flex-flow: row wrap';
    apiData.forEach((item) => {
        const card = document.createElement('div');
        card.style.padding = '10px';
        card.setAttribute('class', 'card');
        const image = document.createElement('img');
        image.setAttribute('src', item.download_url);
        image.setAttribute('class', 'card-image');
        image.style = 'max-width: 100px; max-height: 100px;';
        const text = document.createElement('p');
        text.setAttribute('class', 'card-text');
        text.innerHTML = item.author;
        card.appendChild(image);
        card.appendChild(text);
        cards.appendChild(card);
    });
    document.getElementById('task-3').appendChild(cards);
}

function clearChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}