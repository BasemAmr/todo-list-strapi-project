import React from 'react';
import TodoList from '../components/TodoList';

const Homepage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Homepage</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <TodoList />
            </div>
        </div>
    );
};

export default Homepage;