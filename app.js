// Selectors
const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todoList');
const filterOption = document.querySelector('.filterTodo');

// Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck );
filterOption.addEventListener('click', _filterTodo)


// Functions

function addTodo(event){
   
    event.preventDefault(); // Prevent form from submitting
// Todo div
    const todoDiv = document.createElement('div'); // Todo div
    todoDiv.classList.add("todo");
// Create li
    const newTodo = document.createElement('li'); // Create li
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
// add to div
    todoDiv.appendChild(newTodo); 
   
    // save to storage
    saveLocalTodos(todoInput.value);

    // completed button

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("todoCheck");
    todoDiv.appendChild(completedButton);

    // Delete button
    const deleteButton = document.createElement('button');
   deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add("todoDelete");
    todoDiv.appendChild(deleteButton);

// Append to list

todoList.appendChild(todoDiv);

// Clear input value
todoInput.value = "";
}

function deleteCheck(event){

    //Delete
    const item = event.target;
    if(item.classList[0] === "todoDelete"){ 
        const _todo = item.parentElement;
        //Animation
        _todo.classList.add("fall");
        removelocalTodos(_todo); 
        _todo.addEventListener('transitionend', function(){
            _todo.remove();
        });
       
    }

    // Check

 if(item.classList[0] === "todoCheck"){
        const _todo = item.parentElement;
       _todo.classList.toggle("completed");
    }

}

function _filterTodo(event){
    const _todos = todoList.childNodes;

    _todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display  =  "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }
                else{
                        todo.style.display  =  "none";
                    }
                break;
        
        
        }
    });


}

function saveLocalTodos(_todo){
    // Do  I have something
    let _todos;
    if(localStorage.getItem('_todos') ==  null){
     _todos = [];
    }

    else{
        _todos = JSON.parse(localStorage.getItem('_todos'));
    }

    _todos.push(_todo);
    localStorage.setItem('todos', JSON.stringify(_todos));
}

function getTodos(){
      // Do  I have something
      let _todos;
      if(localStorage.getItem('_todos') ==  null){
       _todos = [];
      }
  
      else{
          _todos = JSON.parse(localStorage.getItem('_todos'));
      }
      _todos.forEach(function(todo){
        const todoDiv = document.createElement('div'); // Todo div
        todoDiv.classList.add("todo");
    // Create li
        const newTodo = document.createElement('li'); // Create li
        newTodo.innerText = todo;
        newTodo.classList.add('todoItem');
    // add to div
        todoDiv.appendChild(newTodo); 
    
        // completed button
    
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add("todoCheck");
        todoDiv.appendChild(completedButton);
    
        // Delete button
        const deleteButton = document.createElement('button');
       deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteButton.classList.add("todoDelete");
        todoDiv.appendChild(deleteButton);
      });
}

function removelocalTodos(todo){
       // Do  I have something
       let _todos;
       if(localStorage.getItem('_todos') ==  null){
        _todos = [];
       }
   
       else{
           _todos = JSON.parse(localStorage.getItem('_todos'));
       }
       const todoIndex = todo.children[0].innerText;
       _todos.splice(_todos.indexOf(todoIndex), 1);  
       localStorage.setItem('_todos', JSON.stringify(_todos));
}