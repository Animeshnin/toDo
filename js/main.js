// Находим элементы на сайте

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList')

const emptyList = document.querySelector('#emptyList')


let tasks = [];

if(localStorage.getItem('tasks')){
    
}

checkEmptyList()
form.addEventListener('submit',addTask)




taskList.addEventListener('click', changesTask)




function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value;


    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    const cssClass = newTask.done? "task-title task-title-done" : 'task-title';

    tasks.push(newTask)
    saveToLocalStorage()
    const taskHtml = 
    `
				<li id='${newTask.id}' class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass} ">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
    `
    taskList.insertAdjacentHTML('beforeend', taskHtml)
    taskInput.value = "";
    taskInput.focus()

    if(taskList.children.length > 1){
        emptyList.classList.add('none')
    }
    checkEmptyList()
    saveToLocalStorage()



    
}

function changesTask(e){
    if(e.target.dataset.action === 'delete'){
        const parentNode = e.target.closest('.list-group-item');
        
        
        
        parentNode.remove()


        const id = parentNode.id;
        const index = tasks.findIndex((task)=> task.id == id);
        

        tasks.splice(index, 1)
        checkEmptyList()
        saveToLocalStorage() 



        
    } 

    else if(e.target.dataset.action === 'done'){
        const parentNode = e.target.closest('.list-group-item');
        parentNode.classList.toggle('task-title--done')

        const id = parentNode.id;
        const task = tasks.find(function(task){
            if(task.id == id){
                return true
            }
        });      

        task.done = !task.done

        saveToLocalStorage() 

        

    }
    console.log(tasks)



        
}

function checkEmptyList(){
    console.log
    if(tasks.length === 0){
        const emptyListElement = 
        `
        		<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>
        `
        taskList.insertAdjacentHTML('afterbegin', emptyListElement)
    } else {
        const emptyListEL = document.querySelector('#emptyList');
        emptyListEL ? emptyListEL.remove(): null;
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}