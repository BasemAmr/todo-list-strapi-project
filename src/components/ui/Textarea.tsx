interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { 
    // Add any custom props here
}

const Textarea = ({ ...rest}: TextareaProps) => {
    return (
        <textarea {...rest} 
        className="block w-full px-3 py-2 text-base text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />        
    )
}

export default Textarea