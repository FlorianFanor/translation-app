import { useEffect, useState } from 'react';

export const useAuthentication = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/profile', {
                    credentials: 'include',
                });

                console.log('Checking authentication status...');
                console.log('Response status:', res.status);

                setIsAuthenticated(res.ok);
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated };
};
