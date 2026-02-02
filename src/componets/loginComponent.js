import { AuthManager } from "../managers/authManager";

export class LoginComponent {
    constructor() {
        this.auth = new AuthManager();
        console.log("entra a  login Component")
    }

    render() {
        return `<div class="conteiner login-view">
    <div class="logo">
        <img src="./public/img/logo-loging.svg" alt="logo" srcset="">
        <h2>CRUDZASO</h2>
    </div>
    <div class="conteiner_form">
        <header>
            <h1>Welcome back</h1>
            <p>Enter your credentials to access the
                platform</p>
        </header>
        <form action="" method="post" id="login-form">
            <label for="input_email">Email or username</label>
            <input type="email" name="" id="input_email" placeholder="student@university.edu">
            <label for="input_password">Password</label>
            <input type="password" name="" id="input_password" placeholder="*********">
            <a href="#/forgot_password?">Forgot password?</a>
    
            <input type="submit" value="Sign in">
        </form>
        <footer>
            <p>Don't have an account? </p><a href="#/register">Register</a>
        </footer>
    </div>
</div>`;
    }


    init() {
        console.log("LoginComponent inicializado");
        const form = document.querySelector("#login-form");

        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const emailInput = document.querySelector("#input_email");
            const email = emailInput.value.trim();
            const passwordInput = document.querySelector("#input_password");
            const password = passwordInput.value.trim();

            // Llamamos al manager que ya busca en el JSON
            const user = await this.auth.login(email,password);

            if (user) {
                console.log("Acceso concedido para:", user.name);

                if (user.role === 'admin') {
                    window.location.hash = "#/admin";
                } else {
                    window.location.hash = "#/dashboard";
                }

            } else {
                alert("Usuario no encontrado. Revisa el email registrado en la base de datos.");
            }
        });
    }
}
