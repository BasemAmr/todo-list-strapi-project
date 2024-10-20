import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import Homepage from "../pages";
import LoginPage from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import RegisterPage from "../pages/Register";
import TodosPage from "../pages/Todos";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ErrorHandler from "../components/ErrorHandler";

const user = localStorage.getItem('loggedInUser');
const loggedInUser = user ? JSON.parse(user) : null;

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
            <Route
                index
                element={
                    <ProtectedRoute isLogged={loggedInUser?.jwt} redirectPath="/login">
                        <Homepage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute isLogged={loggedInUser?.jwt} redirectPath="/login">
                        <h2>Profile</h2>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <ProtectedRoute isLogged={!loggedInUser?.jwt} redirectPath="/">
                        <LoginPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/todos"
                element={
                    <ProtectedRoute isLogged={loggedInUser?.jwt} redirectPath="/login">
                        <TodosPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <ProtectedRoute isLogged={!loggedInUser?.jwt} redirectPath="/">
                        <RegisterPage />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<PageNotFound />} />
        </Route>
    )
);

export default router;