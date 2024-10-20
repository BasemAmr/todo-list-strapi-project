
import { NavLink } from "react-router-dom";
import Button from "./ui/Button";


export const Navbar = () => {


    const user = localStorage.getItem('loggedInUser');
    const loggedInUser = user ? JSON.parse(user) : null;

    return (
        <nav className="max-w-lg mx-auto flex justify-between items-center h-16 bg-gray-800 text-white px-4 shadow-lg">
            <NavLink to="/" className="text-2xl font-bold">Logo</NavLink>
            <ul className="flex space-x-4">
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/profile" 
                        className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}
                    >
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/todos" 
                        className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}
                    >
                        Todos
                    </NavLink>
                </li>

                {!loggedInUser?.jwt && 
                <>
                    <li>
                        <NavLink 
                            to="/login" 
                            className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/register" 
                            className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}
                        >
                            Register
                        </NavLink>
                    </li>
                </> }
                {loggedInUser?.jwt &&
                <li>
                    <Button 
                        onClick={() => {
                            localStorage.removeItem('loggedInUser');
                            location.replace('/');
                        }}
                        variant={"danger"}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                        Logout
                    </Button>
                </li> }
            </ul>
        </nav>
    )
}

export default Navbar