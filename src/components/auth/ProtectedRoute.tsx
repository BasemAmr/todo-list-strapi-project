import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    isLogged: boolean,
    redirectPath: string,
    children: React.ReactNode
}

const ProtectedRoute = ({ isLogged, redirectPath, children}: ProtectedRouteProps) => {
    if (isLogged) return <>{children}</>
    return <Navigate to={redirectPath} />
}

export default ProtectedRoute