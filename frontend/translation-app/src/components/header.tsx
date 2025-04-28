import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">Translate App</Link>
                <nav className="space-x-4">
                    <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                    <Link to="/register" className="text-gray-600 hover:text-blue-600">Register</Link>
                </nav>
            </div>
        </header>
    )
}


export default Header
