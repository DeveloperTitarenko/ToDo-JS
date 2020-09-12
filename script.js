const id = document.getElementById.bind(document);
// все кнопки и поля ввода
const btnSelectAll = id('btnSelectAll'),
    btnDone = id('doneAction'),
    btnRestore = id('restoreAction'),
    btnRemove = id('removeAction'),
    input = id('input'),
    ulElement = id('list');

let toDoList = [];

input.addEventListener('keydown', (e) => {
    if (input.value !== '' && (e.key === 'Enter' || e.keyCode === 13)) {
        toDoList.unshift({
            content: input.value,
            done: false,
            selected: false
        });
        input.value = '';
        upgradedView();
    }
})

function upgradedView() {
    ulElement.innerHTML = '';

    for (let i = 0; i < toDoList.length; i++) {
        const toDoItem = toDoList[i];

        const liElement = document.createElement('li');
        liElement.className = 'list-group-item';
        ulElement.append(liElement);

        const divElement = document.createElement('div');
        divElement.className = 'form-group form-check';
        liElement.append(divElement);

        const checkBoxElement = document.createElement('input');
        divElement.append(checkBoxElement);
        checkBoxElement.type = 'checkbox';
        checkBoxElement.className = 'form-check-input';
        checkBoxElement.id = 'toDoItem' + i;
        checkBoxElement.checked = toDoItem.selected;

        const labelElement = document.createElement('label');
        divElement.append(labelElement);
        labelElement.className = 'form-check-label';
        if (toDoItem.done) {
            labelElement.className += ' todoDone';
        }
        labelElement.setAttribute('for', 'toDoItem' + i);
        labelElement.innerText = toDoItem.content;

        if (!toDoItem.done) {
            const buttonDoneElement = document.createElement('button');
            divElement.append(buttonDoneElement);
            buttonDoneElement.type = 'button';
            buttonDoneElement.className = 'btn btn-outline-primary';
            buttonDoneElement.innerText = 'Done';
            buttonDoneElement.style = 'float: right';

            buttonDoneElement.addEventListener('click', () => {
                toDoItem.done = !toDoItem.done;
                upgradedView()
            })
        } else {
            const buttonRemoveElement = document.createElement('button');
            divElement.append(buttonRemoveElement);
            buttonRemoveElement.type = 'button';
            buttonRemoveElement.className = 'btn btn-outline-danger';
            buttonRemoveElement.innerText = 'Remove';
            buttonRemoveElement.style = 'float: right';

            buttonRemoveElement.addEventListener('click', () => {
                toDoList = toDoList.filter(currentToDoItem => currentToDoItem !== toDoItem);
                upgradedView();
            })
        }

        checkBoxElement.addEventListener('click', () => {
            toDoItem.selected = checkBoxElement.checked;
        })
    }
}

btnDone.addEventListener('click', () => {
    for (const toDoITem of toDoList) {
        if (toDoITem.selected) {
            toDoITem.done = true;
            toDoITem.selected = false;
        }
    }
    upgradedView()
})
btnRestore.addEventListener('click', () => {
    for (const toDoITem of toDoList) {
        if (toDoITem.selected) {
            toDoITem.done = false;
            toDoITem.selected = false;
        }
    }
    upgradedView()
})
btnRemove.addEventListener('click', () => {
    toDoList = toDoList.filter(toDoItem => !toDoItem.selected)

    upgradedView()
})

btnSelectAll.addEventListener('click', () => {
    for (const toDoITem of toDoList) {
        toDoITem.selected = true;
    }
    upgradedView()
})



