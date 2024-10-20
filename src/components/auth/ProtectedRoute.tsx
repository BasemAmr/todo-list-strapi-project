import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    isLogged: boolean,
    redirectPath: string,
    children: React.ReactNode,
    data?: unknown
}

const ProtectedRoute = ({ isLogged, redirectPath, children, data}: ProtectedRouteProps) => {
    if (isLogged) return <>{children}</>
    return <Navigate to={redirectPath} replace state={data} />
}

export default ProtectedRoute