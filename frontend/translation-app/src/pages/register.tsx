import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: userName, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed.");
            } else {
                setSuccess("Registration successful! You can now log in.");
                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            }
        } catch {
            setError("Something went wrong. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                aria-describedby={error ? "register-error" : undefined}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <p className="text-sm text-gray-600 mb-4">
                    All the fields are required.
                </p>


                {error && (
                    <p
                        id="register-error"
                        role="alert"
                        aria-live="assertive"
                        className="text-red-600 mb-4 text-sm"
                    >
                        {error}
                    </p>
                )}

                {success && (
                    <p className="text-green-600 mb-4 text-sm" role="status" aria-live="polite">
                        {success}
                    </p>
                )}

                <div className="mb-4">
                    <Label htmlFor="username" className="mb-2">Username *</Label>
                    <Input
                        id="username"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="email" className="mb-2">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="password" className="mb-2">Password *</Label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <Label htmlFor="confirm-password" className="mb-2">Confirm Password *</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <Button type="submit" className="w-full">
                    Register
                </Button>
            </form>
        </div>
    );
};

export default RegisterPage;
