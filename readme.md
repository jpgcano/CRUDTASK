
    cd CRUDTASK
    ```

2.  **Install dependencies:**
    This project likely requires Node.js and npm (or yarn) for running `json-server` and the development environment (Vite).

    ```bash
    # You might need to install Vite and json-server globally or locally as dev dependencies
    npm install
    # or yarn install
    ```

3.  **Start the API Server:**
    Run your JSON server to handle the CRUD operations on your data file (usually `db.json`):
    ```bash
    # This is a common command for json-server, adjust if necessary
    json-server --watch db.json --port 3000
    ```

4.  **Start the Front-End Application:**
    In a new terminal window, start the Vite development server:
    ```bash
    # This is the standard Vite command
    npm run dev
    # or yarn dev
    ```

5.  **Access the Application:**
    Open your web browser and navigate to the address provided by the Vite server (e.g., `http://localhost:5173`).

## Usage

*   **Login:** The application starts at the login screen. Use credentials that exist in your `db.json` file.
*   **Navigation:** Use the sidebar menu to navigate between the **Dashboard**, **My Tasks**, and **Profile** views.
*   **Task Management:** Click the **"+ new Task"** button to add a new task, or use the table actions to edit or delete existing ones.

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com)

**Do you want to add an author section with your GitHub profile link?**
