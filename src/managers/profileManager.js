import { user } from "../models/user";
import { fechtTasksUser } from "../services/taskServices";
export class profileManager {

    getUser() {
        const rawData = localStorage.getItem('currentUser');

        if (!rawData) {
            console.error("No se encontró currentUser en localStorage");
            return null;
        }

        const data = JSON.parse(rawData);
        return new user(
            data.id,
            data.name,
            data.email,
            data.role,
            data.department
        );
    }
    async getUserTasks(IdUser) {
try {
        const response = await fechtTasksUser(IdUser);
        const tasks = await response.json();
        
  
        return tasks; 
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return [];
    }
    }

    async profile(userId, updatedData) {
        if (!taskId) throw new Error('Task ID is required for update');

        try {
            const updated = await updateUser(taskId, updatedData);
            return updated;
        } catch (error) {
            console.error("Error en taskManager.updateTask:", error);
            throw error;
        }
    }


}
