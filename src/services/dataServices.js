import { user } from '../models/user.js';

export async function fetchUser() {
    const remoteUrl = "http://localhost:3000/users";
    try {
        const response = await fetch(remoteUrl);
        if (response.ok) {
            const data = await response.json();
            return data.map(u => new user(u.id, u.name, u.email, u.password, u.role));
        }
        throw new Error('Remote response not ok');
    }
    catch (err) {
        console.warn('Remote fetch failed, trying local db.json:', err.message || err);
        try {
            const localResp = await fetch('./src/db.json');
            if (!localResp.ok) throw new Error('Cannot load local db.json');
            const localData = await localResp.json();
            const users = localData.users || [];
            return users.map(u => new user(u.id, u.name, u.email, u.password, u.role));
        } catch (localErr) {
            console.error('Error cargando usuarios (local fallback):', localErr);
            return [];
        }
    }
}