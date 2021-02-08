document.getElementById('main').appendChild(getTask4());
submit4();

function getTask4() {
    const output = document.createElement('div');
    output.setAttribute('id', 'task4');
    output.innerHTML = '<h3>task 4</h3>';
    const form = document.createElement('form');
    form.setAttribute('id', 'task4-form');
    const input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('id', 'task4-input1');
    input1.value = '100';
    const input2 = document.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('id', 'task4-input2');
    input2.value = '100';
    const label = document.createElement('label');
    label.innerHTML = 'Enter a number between 100 and 300<br>';
    label.setAttribute('for', 'task4-input1');
    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Submit');
    button.setAttribute('id', 'task4-button');
    const imageWrapper = document.createElement('div');
    imageWrapper.setAttribute('id', 'task4-image');
    output.appendChild(form);
    output.appendChild(imageWrapper);
    form.appendChild(label);
    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(button);
    button.addEventListener('click',
        () => { submit4(); }
    );
    return output;
}

function submit4() {
    const number1 = parseInt(document.getElementById('task4-input1').value);
    const number2 = parseInt(document.getElementById('task4-input2').value);
    clearInput4();
    if (!isNaN(number1) && !isNaN(number2)
        && number1 >= 100 && number2 >= 100
        && number1 <= 300 && number2 <= 300) {
        showMessage('loading');
        request4('https://picsum.photos/' + number1 + '/' + number2);
    } else {
        showMessage('одно из чисел вне диапазона от 100 до 300');
    }
}

function request4(url) {
    fetch(url)
        .then(response => {
            console.log('Task 4');
            console.log(response);
            return response.blob();
        }).then(image => {
            const imageUrl = URL.createObjectURL(image);
            displayResults4(imageUrl);
        })
}

function displayResults4(imageUrl) {
    clearChildren(document.getElementById('task4-image'));
    const card = document.getElementById('task4-image');
    card.setAttribute('class', 'card');
    const image = document.createElement('img');;
    image.setAttribute('src', imageUrl);
    card.appendChild(image);
}

function clearChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function clearInput4() {
    document.getElementById('task4-input1').value = '';
    document.getElementById('task4-input2').value = '';
}

function showMessage(message) {
    clearChildren(document.getElementById('task4-image'));
    const text = document.createElement('p');
    text.appendChild(document.createTextNode(message));
    document.getElementById('task4-image').appendChild(text);
}