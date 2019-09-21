'use strict'

// Get existing todos from local storage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch(e) {
        return []
    }
}

//Save todos to local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render todos based on filters
const renderTodos = (todos, filters) => {

    const todoEl = document.querySelector('#todo')
    const filteredTodos = todos.filter((todo) => {
        if (filters.hideCompleted) {
            return todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) && !todo.completed
        } else {
            return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        }
    })
    const incompleteTodos = filteredTodos.filter((todo) => todo.completed === false)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))
    
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const para = document.createElement('p')
        para.classList.add("empty-message")
        para.textContent = 'No to-dos to show'
        todoEl.appendChild(para)
    }
}

//Get the DOM elements for list summary
const generateSummaryDOM = (todos) => {
    const countParagraph = document.createElement('h2')
    countParagraph.classList.add("list-title")

    if (todos.length === 1) {
        countParagraph.textContent = `You have ${todos.length} todo left`
    } else {
        countParagraph.textContent = `You have ${todos.length} todos left`
    }
    return countParagraph
}

// Remove todo by Id
const removeTodo = (id) => {
    const matchId = todos.findIndex((todo) => todo.id === id)

    if (matchId > -1) {
        todos.splice(matchId, 1)
    }
}

// Generate new p element for each todo
const generateTodoDOM = (todo) => {
    const todoDiv = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoCheck = document.createElement('input')

    //Set up todo checkbox
    todoCheck.setAttribute('type', 'checkbox')
    containerEl.appendChild(todoCheck)
    todoCheck.checked = todo.completed

    todoCheck.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filterObj)
    })

    //Setup todo text
    const todoText = document.createElement('span')

    if (todo.text.length > 0) {
        todoText.textContent = todo.text
    } else {
        todoText.textContent = "Unnamed Todo"
    }
    containerEl.appendChild(todoText)

    todoDiv.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoDiv.appendChild(containerEl)

    //Setup todo remove button
    const todoButton = document.createElement('button')
    todoButton.textContent = 'Remove'
    todoButton.classList.add('button', 'button--text')
    todoDiv.appendChild(todoButton)

    todoButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filterObj)
    })
    return todoDiv
}

// Toggle completed value for a todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo){
        todo.completed = !todo.completed
    }
}
