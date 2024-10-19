import React, { useState } from 'react';
import TodoList from '../components/TodoList';

const initialTodos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Learn TypeScript', completed: false },
    { id: 3, text: 'Build a ToDo App', completed: false },
];

const Homepage: React.FC = () => {
    const [todos, setTodos] = useState(initialTodos);

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Homepage</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
    );
};

export default Homepage;