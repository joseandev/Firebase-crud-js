import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js'

const taskForm = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')

let editingStatus = false

window.addEventListener('DOMContentLoaded', ()=>{
    
    onGetTasks((querySnapshot) => {
        let html = "";

        querySnapshot.forEach(doc => {
            const task = doc.data()
            html += `
                <div class='card card-body mb-2 border-primary'>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <div>
                    <button class='btn btn-secondary btn-edit' data-id='${doc.id}'>Edit</button>
                    <button class='btn btn-danger btn-delete' data-id='${doc.id}' >Delete</button>
                    </div>
                </div>
            `
        });
        tasksContainer.innerHTML = html;

        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')

        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset}})=>{
                deleteTask(dataset.id)
            })
        })

        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')

        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async ({target: {dataset}})=>{
                const doc = await getTask(dataset.id)
                const task = doc.data()
                taskForm['task-id'].value = dataset.id
                taskForm['task-title'].value = task.title
                taskForm['task-description'].value = task.description

                editingStatus = true

                taskForm['btn-task-save'].innerHTML = 'Update'
            })
        })
    })
})

taskForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const title = taskForm['task-title']
    const description = taskForm['task-description']

    if (!editingStatus) {
        saveTask(title.value, description.value)
    } else {
        updateTask(taskForm['task-id'].value, {title: title.value, description: description.value})
        editingStatus = false;
        taskForm['btn-task-save'].innerHTML = 'Save'
    }
    
    taskForm.reset()
})