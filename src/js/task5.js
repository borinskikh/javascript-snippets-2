document.getElementById('main').appendChild(getTask5());
submit5();

function getTask5() {
    const output = document.createElement('div');
    output.setAttribute('id', 'task5');
    output.innerHTML = '<h3>task 5</h3>';
    const form = document.createElement('form');
    form.setAttribute('id', 'task5-form');
    form.style = 'display: flex; flex-flow: row wrap;';
    const field1 = document.createElement('div');
    const label1 = document.createElement('label');
    label1.innerHTML = 'номер страницы<br>';
    label1.setAttribute('for', 'task5-input1');
    const input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('id', 'task5-input1');
    input1.value = '5';
    field1.appendChild(label1);
    field1.appendChild(input1);
    const field2 = document.createElement('div');
    const label2 = document.createElement('label');
    label2.innerHTML = 'лимит<br>';
    label2.setAttribute('for', 'task5-input2');
    const input2 = document.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('id', 'task5-input2');
    input2.value = '7';
    field2.appendChild(label2);
    field2.appendChild(input2);
    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'запрос');
    button.setAttribute('id', 'task5-button');
    const cards = document.createElement('div');
    cards.setAttribute('id', 'task5-cards');
    output.appendChild(form);
    output.appendChild(cards);
    form.appendChild(field1);
    form.appendChild(field2);
    form.appendChild(button);
    button.addEventListener('click',
        () => { submit5(); }
    );
    return output;
}

function submit5() {
    const input1 = parseInt(document.getElementById('task5-input1').value);
    const input2 = parseInt(document.getElementById('task5-input2').value);
    clearInput5();
    if (isNaN(input1) || input1 < 0 || input1 > 10) {
        input1.isNotSuitable = true;
    }
    if (isNaN(input2) || input2 < 0 || input2 > 10) {
        input2.isNotSuitable = true;
    }
    if (input1.isNotSuitable && input2.isNotSuitable) {
        showMessage5('Номер страницы и лимит вне диапазона от 1 до 10');
    } else if (input1.isNotSuitable) {
        showMessage5('Номер страницы вне диапазона от 1 до 10');
    } else if (input2.isNotSuitable) {
        showMessage5('Лимит вне диапазона от 1 до 10');
    } else {
        request5('https://picsum.photos/v2/list?page=' + input1 + '&limit=' + input2);
    }
}

function request5(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log('status: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            console.log('Task 5');
            console.log(result);
            displayResults5(result);
        }
    };
    xhr.onerror = function () {
        console.log('Error! status: ', xhr.status);
    };
    xhr.send();
};
function displayResults5(json) {
    clearChildren(document.getElementById('task5-cards'));
    const cards = document.getElementById('task5-cards');
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

function clearInput5() {
    document.getElementById('task5-input1').value = '';
    document.getElementById('task5-input2').value = '';
}

function showMessage5(message) {
    clearChildren(document.getElementById('task5-cards'));
    const text = document.createElement('p');
    text.appendChild(document.createTextNode(message));
    document.getElementById('task5-cards').appendChild(text);
}