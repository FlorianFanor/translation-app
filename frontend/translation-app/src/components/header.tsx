import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context';
import { Button } from "@/components/ui/button";


const Header = () => {

    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        console.log('Logged out successfully');
        navigate('/login');
    };


    console.log('test', isAuthenticated)
    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">Translate App</Link>
                <nav className="space-x-4">
                    {isAuthenticated ? (
                        <Button onClick={() => handleLogout()}>Logout</Button>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                            <Link to="/register" className="text-gray-600 hover:text-blue-600">Register</Link>
                        </>)}
                </nav>
            </div>
        </header>
    )
}


export default Header
