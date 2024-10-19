import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const initialTodos: Todo[] = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Learn TypeScript', completed: false },
    { id: 3, text: 'Build a ToDo App', completed: false },
];

export const TodosPage: React.FC = () => {
    const [todos, setTodos] = useState(initialTodos);
    const [newTodo, setNewTodo] = useState('');

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const addTodo = () => {
        if (newTodo.trim() === '') return;
        setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
        setNewTodo('');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Todos</h1>
            <div className="mb-4">
                <Input />
                <Button isLoader={false} onClick={addTodo}>
                        Add
                </Button>
            </div>
            <ul className="list-disc pl-5">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className={`mb-2 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                        onClick={() => toggleTodo(todo.id)}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodosPage;