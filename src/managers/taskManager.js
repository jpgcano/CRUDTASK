import { fechtTasks, createTask as createTaskService,updateTask,deleteTask } from "../services/taskServices";

export class taskManager {
    async getAllTasks() {
        const tasks = await fechtTasks();
        return tasks;
    }
    async getUserTasks(IdUser){
        const tasks = await fechtTasks();
        return tasks;
    }

    async createTask(taskData) {
        // validate minimal fields
        if (!taskData || !taskData.name) throw new Error('Task name is required');
        const created = await createTaskService(taskData);
        return created;
    }

async updateTask(taskId, updatedData) {
        if (!taskId) throw new Error('Task ID is required for update');
        
        try {
            // Usamos el servicio externo para mantener la lógica de fallback centralizada
            const updated = await updateTask(taskId, updatedData);
            return updated;
        } catch (error) {
            console.error("Error en taskManager.updateTask:", error);
            throw error;
        }
    }

    // DELETE: Llama al servicio de borrado
    async deleteTask(taskId) {
        if (!taskId) throw new Error('Task ID is required for deletion');

        try {
            const result = await deleteTask(taskId);
            return result;
        } catch (error) {
            console.error("Error en taskManager.deleteTask:", error);
            throw error;
        }
    }

}







