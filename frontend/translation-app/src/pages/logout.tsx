import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const Logout = () => {
    const navigate = useNavigate();


    useEffect(() => {
        const logout = async () => {
            const { logout } = useAuth();
            await logout();
            navigate('/login');


        };

        logout();
    }, [navigate]);

    return (
        <div className="flex min-h-screen justify-center items-center bg-gray-100">
            <h2 className="text-xl font-semibold text-gray-700">Signing you out...</h2>
        </div>
    );
};

export default Logout;
