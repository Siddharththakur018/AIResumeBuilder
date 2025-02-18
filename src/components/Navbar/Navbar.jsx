import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        // Check and set the logged-in state when the component mounts
        const storedLoginState = localStorage.getItem('isLoggedIn') === 'true';
        setLoggedIn(storedLoginState);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Runs only on mount

    const handleLogout = () => {
        // Remove the logged-in state on logout
        localStorage.removeItem('isLoggedIn');
        setLoggedIn(false); // Immediately update the state to reflect logout

        // Redirect to homepage after logout
        navigate('/');
    };

    return (
        <div className={`fixed top-0 left-0 w-full flex justify-between items-center h-20 px-4 md:px-10 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-gray-200 shadow-md border-b' : 'bg-white border-b'
        }`}>
            <div className='text-3xl md:text-4xl font-bold text-blue-400'>
                ResumeGenie
            </div>
            <div className='hidden md:flex bg-fuchsia-600 text-white p-4 rounded-lg font-bold'>
                {/* Conditionally render based on the loggedIn state */}
                {loggedIn ? (
                    <>
                        {/* Only show Logout button if logged in */}
                        <button onClick={handleLogout} className='cursor-pointer'>Logout</button>
                    </>
                ) : (
                    // Show "Get Started" when not logged in
                    <NavLink to='/login' className='cursor-pointer'>Get Started</NavLink>
                )}
            </div>
            {/* Mobile View (Hamburger Menu) */}
            <div className='md:hidden'>
                <button className="text-3xl font-bold text-blue-400" onClick={() => { /* Add logic for mobile menu */ }}>
                    ☰
                </button>
            </div>
        </div>
    );
}

export default Navbar;
