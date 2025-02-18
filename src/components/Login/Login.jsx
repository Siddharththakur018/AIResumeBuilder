import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('isLoggedIn', true);
            navigate('/resume-page');
        } catch (error) {
            setError('Invalid email or password.');
            console.log(error);
        }
    };

    const handleGoogleLogin = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/resume-page');
        } catch (error) {
            console.log(error);
            setError('Google login failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <form onSubmit={handleLogin} className="bg-[#111] p-10 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
                <h2 className="text-4xl font-semibold text-white text-center mb-6">Welcome Back</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-4">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter Email"
                        className="w-full p-3 bg-[#222] text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
                    />
                </div>

                <div className="mb-6">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 bg-[#222] text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-300 mb-4"
                >
                    Sign In
                </button>

                <div
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full py-3 bg-[#222] text-white rounded-lg border border-gray-600 hover:bg-[#333] cursor-pointer transition duration-300 mb-6"
                >
                    <FaGoogle className="w-5 h-5 mr-3" />
                    <span>Continue with Google</span>
                </div>

                <div className="flex justify-between items-center mt-6 text-gray-400 text-sm">
                    <a href="/forgot-password" className="hover:text-white">Forgot Password?</a>
                    <span>
                        Don't have an account? 
                        <a href="/register" className="text-white ml-1 hover:underline">Register</a>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Login;
