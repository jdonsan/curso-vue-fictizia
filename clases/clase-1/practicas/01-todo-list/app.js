$(document).ready(function () {
    $('#button-save').click(onAdd)
})

let todos = []

function onAdd() {
    todos.push($('#input-todo').val())

    render(todos)
}

function onDelete(index) {
    todos.splice(index, 1)
    
    render(todos)
}

function render(todos) {
    const html = todos.reduce((acc, item, index) => {
        return acc + `<li>${item} <button onClick="onDelete(${index})">Eliminar</button></li>`
    }, '')

    $('#todo-list').html(html)
}