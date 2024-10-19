interface InputErrorMessageProps {
    message: string | undefined;
}

const InputErrorMessage = ({ message }: InputErrorMessageProps) => {
    return (
        <span className="block text-sm text-red-600">
            {message}
        </span>
    )
}

export default InputErrorMessage