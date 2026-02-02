import { profileManager } from "../managers/profileManager";

export class ProfileComponent {
    constructor() {
        this.profileMngr = new profileManager();
    }

    async render() {
        // 1. Obtener datos dinámicos
        const currentUser = this.profileMngr.getUser();
        
        // 2. Obtener y contar tareas (asegúrate de que getUserTasks esté corregida en el manager)
        const tasks = await this.profileMngr.getUserTasks(currentUser.id);
        const totalTasks = tasks.length;
            return `
   <div class="conteiner">
            <aside>
                <div class="logo">
                    <img src="./public/img/logo-loging.svg" alt="logo">
                    <h2>CRUDZASO</h2>
                </div>
                <div class="menu">
                    <nav>
                        <ul>
                            <li><img src="./public/img/dashboard.svg" alt=""><a href="#/dashboard">Dashboard</a></li>
                            <li><img src="./public/img/my-task.svg" alt=""><a href="#/my-task">My Tasks</a></li>
                            <li><img src="./public/img/profile.svg" alt=""><a href="#/profile">Profile</a></li>
                        </ul>
                    </nav>
                </div>
                <footer>
                    <div class="user">
                        <img src="./public/img/User_Avatar.svg" alt="photo user">
                        <div>
                            <p>${currentUser.name}</p>
                            <small>${currentUser.role}</small>
                        </div>
                    </div>
                </footer>
            </aside>

            <main class="main" id="main-content">
                <header>
                    <h1>My Profile</h1>
                </header>

                <div class="container dashboard-layout">
                    <!-- Sección de Perfil de Usuario -->
                    <section class="card-profile" id="user-profile-card">
                        <div class="card-profile__image-container">
                            <img src="./public/img/User_Avatar.svg" alt="User Avatar" class="card-profile__avatar">
                        </div>
                        
                        <h4 class="card-profile__name">${currentUser.name}</h4>
                        <p class="card-profile__role">${currentUser.role}</p>
                        
                        <p class="card-profile__email">
                            <img src="./public/img/email.svg" alt="Email" class="icon-small"> 
                            <span>${currentUser.email}</span>
                        </p>
                        
                        <div class="card-profile__stats">
                            <h4 id="task-count">${totalTasks}</h4>
                            <p>Tasks</p>
                        </div>
                    </section>

                    <!-- Sección de Información Personal -->
                    <section class="personal-information">
                        <div class="personal-info-header">
                            <h4>Personal Information</h4>
                            <a href="#/edit-profile"><img src="./public/img/edit.svg" alt="edit">Edit Profile</a>
                        </div>

                        <div class="info-grid">
                            <!-- Pareja 1 -->
                            <div class="info-row">
                                <div class="info-group">
                                    <label>Name</label>
                                    <p class="info-value">${currentUser.name}</p>
                                </div>
                                <div class="info-group">
                                    <label>Employee ID</label>
                                    <p class="info-value">CZ-${currentUser.id}</p>
                                </div>
                            </div>

                            <!-- Pareja 2 -->
                            <div class="info-row">
                                <div class="info-group">
                                    <label>Phone</label>
                                    <p class="info-value">${currentUser.phone || 'N/A'}</p>
                                </div>
                                <div class="info-group">
                                    <label>Department</label>
                                    <p class="info-value">${currentUser.department || 'Not Assigned'}</p>
                                </div>
                            </div>

                            <!-- Pareja 3 -->
                            <div class="info-row">
                                <div class="info-group">
                                    <label>Role Level</label>
                                    <p class="info-value">${currentUser.role}</p>
                                </div>
                                <div class="info-group">
                                    <label>Join Date</label>
                                    <p class="info-value">September 14, 2020</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            </div>`
            
    }
}