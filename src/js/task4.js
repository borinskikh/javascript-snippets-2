document.getElementById('main').appendChild(getTask4());
document.getElementById('task4-input1').value = '100';
document.getElementById('task4-input2').value = '100';
submit4();


function getTask4() {
    const output = document.createElement('div');
    output.setAttribute('id', 'task4');
    output.innerHTML = '<h3>task 4</h3>';
    const form = document.createElement('form');
    form.setAttribute('id', 'task4-form');
    form.setAttribute('class', 'form');
    const field1 = document.createElement('div');
    field1.setAttribute('id', 'task4-field1');
    const input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('id', 'task4-input1');
    const label1 = document.createElement('label');
    label1.innerHTML = 'Enter a number between 100 and 300<br>';
    label1.setAttribute('for', 'task4-input1');
    field1.appendChild(label1);
    field1.appendChild(input1);
    const field2 = document.createElement('div');
    field2.setAttribute('id', 'task4-field2');
    const input2 = document.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('id', 'task4-input2');
    field1.appendChild(input2);
    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Submit');
    button.setAttribute('id', 'task4-button');
    const imageWrapper = document.createElement('div');
    imageWrapper.setAttribute('id', 'task4-image');
    output.appendChild(form);
    output.appendChild(imageWrapper);
    form.appendChild(field1);
    form.appendChild(field2);
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
            console.log('Task 4:');
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