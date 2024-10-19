import { NavLink, useLocation } from "react-router-dom"

interface NavbarProps {
    // props here
}

export const Navbar = ({ }: NavbarProps) => {
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
                        to="/login" 
                        className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}
                    >
                        Login
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
                <li>
                    <NavLink 
                        to="/register" 
                        className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}
                    >
                        Register
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar