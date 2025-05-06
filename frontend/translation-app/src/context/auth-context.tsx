// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

type User = { userId: string; email: string } | null;

interface AuthContextType {
    user: User;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);

    const checkAuth = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/profile', {
                credentials: 'include',
            });
            const data = await res.json();

            if (res.ok) {
                setUser(data);
            }


            console.log('User data:', data);
        } catch {
            setUser(null);
        }
    };

    const login = async (email: string, password: string) => {
        await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        await checkAuth();
    };

    const logout = async () => {
        await fetch('http://localhost:3000/api/logout', {
            method: 'POST', // or POST, depending on your backend
            credentials: 'include',
        });
        localStorage.clear();
        setUser(null);

    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
