import { taskManager } from "../managers/taskManager";
export class DashboardComponent {
    constructor() {
        this.task = new taskManager();
        console.log("entra a DashboardComponent")
    }
    async render() {
        console.log("Renderizando DashboardComponent");
        try {
            // Load tasks before building the template so we don't embed a Promise into the markup
            const tasks = await this.task.getAllTasks();
            const rows = tasks.map(task => `
                        <tr>
                            <td>${task.name}</td>
                            <td>${task.assignee}</td>
                            <td>${task.status}</td>
                            <td>${task.priority}</td>
                            <td>${task.dueDate}</td>
                            <td>
                                <a href="#/update-task?id=${task.id}" class="edit-btn" data-id="${task.id}">Edit</a>
                                <button class="delete-btn" data-id="${task.id}">Delete</button>
                            </td>
                        </tr>
                    `).join('');

            return `<div class="app-container dashboard-view">
    <aside>
        <div class="logo">
            <img src="./public/img/logo-loging.svg" alt="logo">
            <h2>CRUDZASO</h2>
        </div>
        <div class="menu">
            <nav>
                <ul>
                    <li><img src="./public/img/dashboard.svg" alt=""><a href="#/dashboard">Dashboard</a></li>
                    <li><img src="./public/img/task.svg" alt=""><a href="#/my-task">My Tasks</a></li>
                    <li><img src="./public/img/profile.svg" alt=""><a href="#/profile">Profile</a></li>
                </ul>
            </nav>
        </div>
    </aside>
    <!-- Encabezado Específico del Dashboard -->
    <header class="dashboard__header">
        <div class="dashboard__header-breadcrumb">
            <img src="./public/img/home.svg" alt="logo home">
            <p> > Dashboard</p>
        </div>
        <div class="dashboard__header-actions">
            <img src="./public/img/notifi.svg" alt="campana de notificaciones">
            <div class="user">
                <img src="./public/img/User_Avatar.svg" alt="photo user">
                <p>alex morgan</p>
                <title>Product Designer</title>
            </div>
            <img src="./public/img/loguo.svg" alt="logo" srcset="">
        </div>
    </header>
    <main class="main" id="main-content">
        <section class="dashboard__actions-section">
            <div>
                <h1> Task Manager</h1>
                <p>Overview of your current academic performance tasks.</p>
            </div>
            <div>
                <a href="#/new-task"><button type="button"> + new Task</button></a>
            </div>
        </section>

        <!-- Tarjetas de Estadísticas Específicas -->
        <section class="dashboard__stats-cards">
            <div class="dashboard__card-conteiner">
                <h2>Total Tasks <img src="./public/img/taskTotal.svg" alt="" srcset=""></h2>
                <p>24</p>
                <div>
                    <p><img src="./public/img/grafica.svg" alt=""> +12% from last week</p>
                </div>
            </div>
            <div class="dashboard__card-conteiner">
                <h2>Completed<img src="./public/img/taskCOmplete.svg" alt="" srcset=""></h2>
                <p>24</p>
                <div>
                    <p><img src="./public/img/ckeack.svg" alt=""> On track</p>
                </div>
            </div>
            <div class="dashboard__card-conteiner">
                <h2>Pending <img src="./public/img/taskPending.svg" alt="" srcset=""></h2>
                <p>24</p>
                <div>
                    <p><img src="./public/img/pendiente.svg" alt=""> 2 High Priority</p>
                </div>
            </div>
            <div class="dashboard__card-conteiner">
                <h2>Overall Progress<img src="./public/img/taskProgress.svg" alt="" srcset=""></h2>
                <p>24</p>
                <div>
                    <p><img src="./public/img/iconify-icon(2).svg" alt=""> Keep it up!</p>
                </div>
            </div>
        </section>
        <section class="dashboard__filters-section">
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
                    <th>Task Name</th>
                    <th>Assignee </th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Actions</th>
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