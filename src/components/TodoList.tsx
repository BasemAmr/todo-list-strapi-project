import React from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
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

export default TodoList;