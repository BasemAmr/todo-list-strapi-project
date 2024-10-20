import Button from './ui/Button';
import { useAuthQuery } from '../hooks/useAuthQUery';

const user = localStorage.getItem('loggedInUser');
const loggedInUser = user ? JSON.parse(user) : null;

const TodoList: React.FC = () => {

    const { data, isLoading } = useAuthQuery({
        queryKey: ['todos'],
        url: '/users/me?populate=todos',
        config: {
            headers: {
                Authorization: `Bearer ${loggedInUser.jwt}`
            }
        }
    });

    return (
        <>
            {isLoading ? <p>Loading...</p> :
            <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Todos</h1>
                <div className="space-y-4">


                {data.todos.length ?
                data.todos.map(todo => (
                    <div key={todo.id} className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200">
                    <div className="flex-1 mb-2 sm:mb-0">
                        <p className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>{todo.title}</p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="success" size="sm">Edit</Button>
                        <Button variant="danger" size="sm">Remove</Button>
                    </div>
                    </div>
                )) : <p className="text-center">No todos found</p>}
                </div>
            </div>
            }
        </>
    );
}

export default TodoList;
