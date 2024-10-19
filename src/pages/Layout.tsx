import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white shadow-lg">
        <Navbar />
      </header>
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Root Layout</h1>
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        © 2023 Your Company
      </footer>
    </div>
  )
}

export default RootLayout