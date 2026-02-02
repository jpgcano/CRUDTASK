import {task} from '../models/task.js';

export async function fechtTasks() {
    const remoteUrl = "http://localhost:3000/tasks";
    try {
        const response = await fetch(remoteUrl);
        if (response.ok) {
            const data = await response.json();
            return data.map(u => new task(u.id, u.name, u.assignee, u.status, u.priority, u.dueDate));
        }
        throw new Error('Remote response not ok');
    }
    catch (err) {
        console.warn('Remote fetch failed:', err.message || err);
        // If remote server not available, fallback to local db.json if it contains a `tasks` array
        try {
            const localResp = await fetch('./src/db.json');
            if (!localResp.ok) throw new Error('Cannot load local db.json');
            const localData = await localResp.json();
            const tasks = localData.tasks || [];
            // also include any tasks saved locally in localStorage (fallback)
            const localStored = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem('localTasks') || '[]') : [];
            const combined = tasks.concat(localStored);
            return combined.map(u => new task(u.id, u.name, u.assignee, u.status, u.priority, u.dueDate));
        } catch (localErr) {
            console.error('Error cargando tareas (local fallback):', localErr);
            return [];
        }
    }
}
export async function fechtTasksUser(userid) {
    const remoteUrl = `http://localhost:3000/tasks${userid}`;
    try {
        const response = await fetch(remoteUrl);
        if (response.ok) {
            const data = await response.json();
            if(data.id===userid){
            return data.map(u => new task(u.id, u.name, u.category, u.priority, u.status, u.dueDate));
        }else{
            return null;
        }
    }
        throw new Error('Remote response not ok');
    }
    catch (err) {
        console.warn('Remote fetch failed:', err.message || err);
        // If remote server not available, fallback to local db.json if it contains a `tasks` array
        try {
            const localResp = await fetch('./src/db.json');
            if (!localResp.ok) throw new Error('Cannot load local db.json');
            const localData = await localResp.json();
            const tasks = localData.tasks || [];
            // also include any tasks saved locally in localStorage (fallback)
            const localStored = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem('localTasks') || '[]') : [];
            const combined = tasks.concat(localStored);
            return combined.map(u => new task(u.id, u.name, u.assignee, u.status, u.priority, u.dueDate));
        } catch (localErr) {
            console.error('Error cargando tareas (local fallback):', localErr);
            return [];
        }
    }
}

export async function createTask(taskData) {
    const remoteUrl = "http://localhost:3000/tasks";
    try {
        const response = await fetch(remoteUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        if (response.ok || response.status === 201) {
            const data = await response.json();
            return new task(data.id, data.name, data.assignee, data.status, data.priority, data.dueDate);
        }
        throw new Error('Remote create failed');
    } catch (err) {
        console.warn('Create task failed on remote, saving to localStorage fallback:', err.message || err);
        const localKey = 'localTasks';
        const stored = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem(localKey) || '[]') : [];
        const id = Date.now().toString();
        const fallback = {
            id,
            name: taskData.name,
            assignee: taskData.assignee,
            status: taskData.status || 'pending',
            priority: taskData.priority || 'low',
            dueDate: taskData.dueDate || ''
        };
        stored.push(fallback);
        if (typeof localStorage !== 'undefined') localStorage.setItem(localKey, JSON.stringify(stored));
        return new task(fallback.id, fallback.name, fallback.assignee, fallback.status, fallback.priority, fallback.dueDate);
    }
}
export async function updateTask(taskId, taskData) {
    const remoteUrl = `http://localhost:3000/tasks/${taskId}`;
    try {
        const response = await fetch(remoteUrl, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

        if (response.ok) {
            const data = await response.json();
            return new task(data.id, data.name, data.assignee, data.status, data.priority, data.dueDate);
        }
        throw new Error('Remote update failed');
    } catch (err) {
        console.error('Update failed on remote, checking localStorage:', err.message);
        
        const localKey = 'localTasks';
        let stored = JSON.parse(localStorage.getItem(localKey) || '[]');
        const index = stored.findIndex(t => t.id === taskId);

        if (index !== -1) {
            stored[index] = { ...stored[index], ...taskData };
            localStorage.setItem(localKey, JSON.stringify(stored));
            const u = stored[index];
            return new task(u.id, u.name, u.assignee, u.status, u.priority, u.dueDate);
        }
        throw new Error('Task not found in remote nor local storage');
    }
}

export async function deleteTask(taskId) {
    const remoteUrl = `http://localhost:3000/tasks/${taskId}`;
    try {
        const response = await fetch(remoteUrl, { method: 'DELETE' });
        if (response.ok) return true;
        throw new Error('Remote delete failed');
    } catch (err) {
        console.warn('Delete failed on remote, removing from localStorage:', err.message);
        
        const localKey = 'localTasks';
        let stored = JSON.parse(localStorage.getItem(localKey) || '[]');
        const filtered = stored.filter(t => t.id !== taskId);
        
        localStorage.setItem(localKey, JSON.stringify(filtered));
        return true;
    }
}