import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ error, ...props }, ref) => {
    return (
        <input
            className={` w-full shadow border rounded-md py-2 px-3 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 ${error ? 'border-red-500' : ''}`}
            ref={ref}
            {...props}
        />
    );
});

export default Input;