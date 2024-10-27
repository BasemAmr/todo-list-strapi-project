import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const user = localStorage.getItem('loggedInUser');
    const loggedInUser = user ? JSON.parse(user) : null;

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <motion.nav
            className="max-w-6xl w-min gap-10 flex justify-between items-center h-20 px-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md rounded-lg my-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Logo/Title */}
            <NavLink to="/" className="text-3xl font-semibold hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300">
                Todos
            </NavLink>

            {/* Navigation Links */}
            <ul className="flex space-x-6 items-center">
                {!loggedInUser?.jwt ? (
                    <>
                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-500 dark:text-yellow-400 font-semibold"
                                        : "hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300"
                                }
                            >
                                Login
                            </NavLink>
                        </motion.li>

                        <motion.li
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-500 dark:text-yellow-400 font-semibold"
                                        : "hover:text-blue-500 dark:hover:text-yellow-400 transition-colors duration-300"
                                }
                            >
                                Register
                            </NavLink>
                        </motion.li>
                    </>
                ) : (
                    <motion.li
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button
                            onClick={() => {
                                localStorage.removeItem('loggedInUser');
                                location.replace('/');
                            }}
                            className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-md shadow-md hover:bg-red-600 dark:hover:bg-red-700 transition-all duration-300"
                        >
                            Logout
                        </button>
                    </motion.li>
                )}

            </ul>
        </motion.nav>
    );
};

export default Navbar;
