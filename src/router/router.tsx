import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import RootLayout from "../pages/Layout"
import Homepage from "../pages"
import LoginPage from "../pages/Login"
import PageNotFound from "../pages/PageNotFound"
import RegisterPage from "../pages/Register"
import TodosPage from "../pages/Todos"
import ProtectedRoute from "../components/auth/ProtectedRoute"


const isLogged = true


const router = createBrowserRouter(createRoutesFromElements([
    <>
        <Route path="/" element={<RootLayout />}>
             {/*
             creating protected routes for:
             <Homepage />
             <h2>Profile</h2>
             <LoginPage />
             <TodosPage />
            <RegisterPage />
            <PageNotFound /> which isnt protected
             
             */}

                
            <Route index element={
                <ProtectedRoute isLogged={isLogged} redirectPath="/login">
                    <Homepage />
                </ProtectedRoute>} />
            <Route path="/profile" element={
                <ProtectedRoute isLogged={isLogged} redirectPath="/login">
                    <h2>Profile</h2>
                </ProtectedRoute>} />
            <Route path="/login" element={
                <ProtectedRoute isLogged={isLogged} redirectPath="/login">
                    <LoginPage />
                </ProtectedRoute>} />
            <Route path="/todos" element={
                <ProtectedRoute isLogged={isLogged} redirectPath="/login">
                    <TodosPage />
                </ProtectedRoute>} />
            <Route path="/register" element={
                <ProtectedRoute isLogged={isLogged} redirectPath="/login">
                    <RegisterPage />
                </ProtectedRoute>} />
                
                {/* Page Not FOund */}
                <Route path="*" element={<PageNotFound />} />
        </Route>
        
    </>
]))


export default router