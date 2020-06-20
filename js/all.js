
var todoData = [];

var todoList = document.getElementById('todoList');
var newTodo = document.getElementById('newTodo');
var addTodoBtn = document.querySelector('#addTodo');
var taskCount = document.getElementById('taskCount');

addTodoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', removeTodo);
todoList.addEventListener('click', complete);

// 新增 todo
function addTodo() {
    if (newTodo.value.trim() !== '') {
        todoData.push({
            id: Math.floor(Date.now()),
            title: newTodo.value,
            completed: false,
        });
    }
    newTodo.value = '';
    taskCount.textContent = todoData.length;
    render();
};

// 刪除 todo
function removeTodo(e) {
    var newIndex = 0;
    if (e.target.dataset.action == 'remove') {
        todoData.forEach(function (item, key) {
            if (e.target.dataset.id == item.id) {
                newIndex = key;
            }
        });
        todoData.splice(newIndex, 1);
    }
    taskCount.textContent = todoData.length;
    render();
}

// 有無完成
function complete(e) {
    if (e.target.dataset.action == 'complete') {
        todoData.forEach(function (item) {
            if (e.target.dataset.id == item.id) {
                if (item.completed) {
                    item.completed = false;
                } else {
                    item.completed = true;
                }
            }
        });
    }
    taskCount.textContent = todoData.length;
    render();
}

// 渲染畫面
function render() {
    var str = '';

    todoData.forEach(function (item) {
        str += `<li class="list-group-item">
                <div class="d-flex">
                <div class="form-check">
                <input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
                <label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
                </div>
                <button type="button" class="close ml-auto" aria-label="Close">
                <span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
                </button>
                </div>
                </li>`;
    });

    todoList.innerHTML = str;
};

render();