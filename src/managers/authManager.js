import { fetchUser } from "../services/dataServices.js";

export class AuthManager {
    async login(email,password) {
        console.log("entrando a authManager")
        const users = await fetchUser();
        const foundUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password===password);
        if (foundUser) {
            this.saveSession(foundUser);
            return foundUser;
        } else {
            return null; //usuario no encontrado
        }

    }

    saveSession(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = "./src/view/login.html"
    }
}