import { LoginComponent } from "../componets/loginComponent.js";
import { DashboardComponent } from "../componets/dashboardComponent.js";
import { newTaskComponent } from "../componets/newTaskComponen.js";
import { updateTaskComponent } from "../componets/updateComponent.js";
import { mytasks } from "../componets/mytaskComponent.js";
import { ProfileComponent } from "../componets/profileComponent.js";
const routers = {
    "login": new LoginComponent(),
    "dashboard": new DashboardComponent(),
    "new-task": new newTaskComponent(),
    "update-task": new updateTaskComponent(),
    "my-task": new mytasks(),
    "profile": new ProfileComponent()
}

export async function router() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const hash = location.hash || "#/login";
    let path = hash.split('/')[1] || "login";
    path = path.split('?')[0];

    console.log("ntrando a ", path)
    // PROTECCIÓN DE RUTAS 
    if (!user && path !== "login") {
        window.location.hash = "#/login";
        return;
    }

    if (user && path === "admin" && user.role !== "admin") {
        alert("Acceso denegado: No eres administrador");
        window.location.hash = "#/dashboard";
        return;
    }

    const component = routers[path];
    const appContainer = document.querySelector("#app");

    if (!appContainer) return;

    if (component) {
        appContainer.innerHTML = await component.render();

        // 5. Ejecutamos la lógica
        component.init();
    } else {
        appContainer.innerHTML = "<h1>404 - Página no encontrada</h1>";
    }

    console.log(`Navegando a: ${path}`);
}

