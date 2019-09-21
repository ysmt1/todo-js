'use strict'

const todos = getSavedTodos()

const filterObj = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos,filterObj)

document.querySelector('#search-todo').addEventListener('input', (e) => {
    filterObj.searchText = e.target.value
    renderTodos(todos, filterObj)
})

document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const input = e.target.elements.addTodo.value.trim()

    if (input.length > 0) {

        todos.push({
            id: uuidv4(),
            text: input,
            completed: false
        })
        saveTodos(todos)
        renderTodos(todos, filterObj)
        e.target.elements.addTodo.value = ''
    }
})

document.querySelector('#hide').addEventListener('change', (e) => {
    filterObj.hideCompleted = e.target.checked
    renderTodos(todos, filterObj)
})