const id = document.getElementById.bind(document);

const btnSelectAll = id('btnSelectAll');
const btnDone = id('doneAction');
const btnRestore = id('restoreAction');
const input = id('input');

btnSelectAll.addEventListener('click', () => {
    input.value += ' Сука не жми сюда';
})
