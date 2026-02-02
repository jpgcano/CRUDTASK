import { taskManager } from "../managers/taskManager";
export class newTaskComponent {
    constructor() {
        this.task = new taskManager();
        console.log("entra a newTaskComponent")
    }
    async render() {
        return `
        <div class="conteiner">
            <div>
                <a href="/tasks"> <img src="./public/img/arrow.svg" alt="">Back to Tasks</a>
                <h1>Create New Task</h1>
            </div>
            <form id="new-task-form" action="" method="post">
                <label for="title">Task Title *</label>
                <input type="text" id="title" name="title" required placeholder="e.g., Complete Quarter 3 Report">
                <label for="Category">Category</label>
                <select id="category" name="category">
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="History">History</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Literature">Literature</option>
                </select>
                <label for="priority">Priority</label>
                <select id="priority" name="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <label for="status">Status</label>
                <select id="status" name="status">
                    <option value="in-progress">In Progress</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <label for="due-date">Due Date</label>
                <input type="date" id="due-date" name="due-date">
                <label for="description">Description</label>
                <textarea id="description" name="description" placeholder="Enter task description"></textarea>
                <button type="button" id="cancel-btn">Cancel</button>
                <button type="submit">Save Task</button>
            </form>    
        </div>`;
    }
    init() {
        const form = document.querySelector('#new-task-form');
        const cancelBtn = document.querySelector('#cancel-btn');

        if (cancelBtn) {
            cancelBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = '#/dashboard';
            });
        }

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const title = document.querySelector('#title').value.trim();
                const category = document.querySelector('#category').value;
                const priority = document.querySelector('#priority').value;
                const status = document.querySelector('#status').value;
                const dueDate = document.querySelector('#due-date').value;
                const description = document.querySelector('#description').value.trim();

                if (!title) {
                    alert('Title is required');
                    return;
                }

                try {
                    const currentUser = JSON.parse(localStorage.getItem('currentUser') || null);
                    const assignee = currentUser ? currentUser.name : '';

                    const created = await this.task.createTask({
                        name: title,
                        assignee,
                        priority,
                        dueDate,
                        status,
                        category,
                        description
                    });

                    window.location.hash = '#/dashboard';
                } catch (err) {
                    console.error('Error creating task:', err);
                    alert('No se pudo crear la tarea. Revisa la consola.');
                }
            });
        }
    }

}
