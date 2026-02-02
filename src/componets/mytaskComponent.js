import { taskManager } from "../managers/taskManager";
export class mytasks {
    constructor() {
        this.task = new taskManager();
        console.log("entra a DashboardComponent")
    }
    async render() {
        console.log("Renderizando DashboardComponent");
        try {
            // Load tasks before building the template so we don't embed a Promise into the markup
            const tasks = await this.task.getUserTasks();
            const rows = tasks.map(task => `
                        <tr>
                            <td><input type="checkbox" name="" id=""></td>
                            <td><h3>${task.name}<h3>
                            <p>${task.id} •  ${task.dueDate}</p>
                            </td>
                            <td>${task.category}</td>
                            <td>${task.priority}</td>
                            <td>${task.status}</td>
                            <td>
                        </tr>
                    `).join('');

            return `<div class="app-container mytasks-view">
    <aside>
        <div class="logo">
            <img src="./public/img/logo-loging.svg" alt="logo">
            <h2>CRUDZASO</h2>
        </div>
        <div class="menu">
            <nav>
                <ul>
                    <li><img src="./public/img/my-task.svg" alt=""><a href="#/my-task">My Tasks</a></li>
                    <li><img src="./public/img/profile.svg" alt=""><a href="#/profile">Profile</a></li>
                </ul>
            </nav>
        </div>
    </aside>
    <!-- Encabezado Específico para MyTasks -->
    <header class="mytasks-header">
        <div class="mytasks-header-breadcrumb">
            <img src="./public/img/home.svg" alt="logo home">
            <p> > Dashboard</p>
        </div>
        <div>
            <img src="./public/img/notifi.svg" alt="campana de notificaciones">
            <div class="user">
                <img src="./public/img/User_Avatar.svg" alt="photo user">
                <p>alex morgan</p>
                <title>Product Designer</title>
            </div>
        </div>
        <img src="./public/img/loguo.svg" alt="logo" srcset="">
    </header>
    <main class="main" id="main-content">
        <section class="mytasks-actions-section">
            <div>
                <h1> Task Management</h1>
                <p>View, edit, and organize all academic tasks in one place.</p>
            </div>
            <div>
                <a href="#/new-task"><button type="button"> + new Task</button></a>
            </div>
        </section>

        <section class="mytasks-stats-cards">
            <div class="card_conteiner">
                <h2>Total Tasks </h2>
                <p>24</p>
                <div>
                    <img src="./public/img/taskCompletedUser.svg" alt=""> 
                </div>
            </div>
            <div class="card_conteiner">
                <h2>Completed</h2>
                <p>24</p>
                <div>
                    <img src="./public/img/taskCompletedUser.svg" alt="">
                </div>
            </div>
            <div class="card_conteiner">
                <h2>Pending Review </h2>
                <p>24</p>
                <div>
                    <img src="./public/img/taskPendingUser.png" alt=""> 
                </div>
            </div>
            <div class="card_conteiner">
                <h2>In Progress</h2>
                <p>24</p>
                <div>
                    <img src="./public/img/taskProgressUser.svg" alt="">
                </div>
            </div>
        </section>
        <section class="mytasks-filters-section">
            <div class="search_task">
                <input type="text" placeholder="Search tasks...">
                <img src="./public/img/search.svg" alt="icono de busqueda">
            </div>
                <p class="filter-label" data-filter="all">All Tasks</p>
                <p class="filter-label" data-filter="pending">Pending</p>
                <p class="filter-label" data-filter="completed">Completed</p>
        </section>
        <section class="task-list" id="task-list">
            <table>
                <tr>
                    <th><input type="checkbox" name="" id=""></th>
                    <th>Task Name</th>
                    <th>Category </th>
                    <th>Priority</th>
                    <th>Status</th>
                </tr>
                ${rows}
            </table>
        </section>
    </main>
</div>
            `;
        } catch (error) {
            console.error("Error en render:", error);
            return `<h1>Error al cargar el dashboard. Por favor, verifica que json-server esté corriendo.</h1>`;
        }
    }
}