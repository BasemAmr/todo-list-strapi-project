# Todo Application

A modern Todo application built with React and TypeScript, utilizing Tailwind CSS for styling and Axios for API interactions. The app provides a user-friendly interface for managing tasks, including features such as authentication, pagination, and error handling.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Description of Key Files](#Description-of-Key-Files)

## Features

- User Authentication (Register and Login)
- Create, Read, Update, and Delete (CRUD) Todo items
- Pagination for Todo lists
- Responsive UI built with Tailwind CSS
- Error handling and loading states
- User-friendly components with reusable UI elements

## Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Query (for data fetching and synchronization)
- **HTTP Client**: Axios
- **Routing**: React Router
- **Linting**: ESLint, Prettier
- **Build Tools**: Vite

## Installation

To get started with the Todo application, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/BasemAmr/todo-list-strapi-project.git
   cd todo-app
   
2. **Install dependencies**:
  ```bash
  npm install
  ```

3. **Run the development server:**:
  ```bash
  npm install
  ```

4. Open your browser and navigate to http://localhost:5173 to view the application.

## Usage
1. Register: Create a new user account by filling out the registration form.
2. Login: Use your credentials to log into the application.
3. Manage Todos: Once logged in, you can:
  - Add new Todo items
  - Edit existing Todo items
  - Delete Todo items
  - Navigate through pages of Todo items

## Description of Key Files
  - ui/: Contains reusable UI components such as buttons, inputs, modals, and todo items.
  - hooks/: Custom hooks for managing todos and handling authentication.
  - pages/: Contains different pages of the application like Login, Register, and the main layout.
  - router/: Manages the application’s routing.
  - config/: Configuration files for Axios or other services.
  - validation/: Contains validation logic for forms.
