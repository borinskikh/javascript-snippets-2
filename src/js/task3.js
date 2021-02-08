(() => {
    document.getElementById('main').appendChild(getTask());
    if (window.localStorage.getItem('task3-cards')) {
        document.getElementById('task3-cards').innerHTML = window.localStorage.getItem('task3-cards');
        console.log('Task 3: local storage was used');
    } else {
        document.getElementById('task3-input').value = '3';;
        submit();
    }

    function getTask() {
        const output = document.createElement('div');
        output.setAttribute('id', 'task3');
        output.innerHTML = '<h3>task 3</h3>';
        const form = document.createElement('form');
        form.setAttribute('id', 'task3-form');
        form.setAttribute('class', 'form');
        const field = document.createElement('div');
        field.setAttribute('id', 'task3-field');
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'task3-input');
        input.setAttribute('class', 'input');
        const label = document.createElement('label');
        label.innerHTML = 'Enter a number between 1 and 10<br>';
        label.setAttribute('for', 'task3-input');
        field.appendChild(label);
        field.appendChild(input);
        const button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Submit');
        button.setAttribute('id', 'task3-button');
        const cards = document.createElement('div');
        cards.setAttribute('id', 'task3-cards');
        cards.setAttribute('class', 'cards');
        form.appendChild(field);
        form.appendChild(button);
        output.appendChild(form);
        output.appendChild(cards);
        button.addEventListener('click',
            () => { submit(); }
        );
        return output;
    }

    function submit() {
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
        const text = document.createElement('p');
        text.appendChild(document.createTextNode(message));
        document.getElementById('task3-cards').appendChild(text);
    }
})();