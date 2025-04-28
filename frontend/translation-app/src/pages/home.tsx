import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
        <main className="min-h-screen flex-grow flex items-center justify-center text-center">
            <div>
                <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Translate App</h1>
                <p className="text-lg text-gray-600 mb-8">Create an account or log in to get started!</p>
                <div className="space-x-4">
                    <Link to="/register" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                        Register
                    </Link>
                    <Link to="/login" className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400">
                        Login
                    </Link>
                </div>
            </div>
        </main>

    );
};

export default HomePage;
