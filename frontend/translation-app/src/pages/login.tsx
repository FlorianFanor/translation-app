import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
                aria-describedby={error ? "login-error" : undefined}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <p className="text-sm text-gray-600 mb-4">
                    All the fields are required.
                </p>

                {error && (
                    <p
                        id="login-error"
                        role="alert"
                        aria-live="assertive"
                        className="text-sm text-red-600 mb-4"
                    >
                        {error}
                    </p>
                )}

                <div className="mb-4">
                    <Label htmlFor="email" className="mb-2">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={!!error}
                    />
                </div>

                <div className="mb-6">
                    <Label htmlFor="password" className="mb-2">Password *</Label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-invalid={!!error}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;
