import { HTMLAttributes } from "react"
import {Loader} from "lucide-react"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    type?: "button" | "submit" | "reset",
    isLoader?: boolean,
}

const Button = ({ children, type, isLoader, ...rest}: ButtonProps) => {
    return (
        <>
            <button className={`w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 
            ${isLoader ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            type={type}
            {...rest}
            >
                {
                    isLoader ? <> <Loader size="20" className="inline" /> children </>: children
                }
            </button>
        </>
    )
}

export default Button