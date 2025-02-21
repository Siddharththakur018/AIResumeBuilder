import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); 

    useEffect(() => {
        const storedLoginState = localStorage.getItem('isLoggedIn') === 'true';
        setLoggedIn(storedLoginState);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); 

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setLoggedIn(false); 
        navigate('/');
    };

    return (
        <div className={`fixed top-0 left-0 w-full flex justify-between items-center h-20 px-4 md:px-10 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-gray-200 shadow-md border-b' : 'bg-white border-b'
        }`}>
            <div className='text-3xl md:text-4xl font-bold text-blue-400'>
                ResumeGenie
            </div>
            <div className='flex bg-fuchsia-600 text-white p-4 rounded-lg font-bold'>
                {loggedIn ? (
                    <button onClick={handleLogout} className='cursor-pointer'>Logout</button>
                ) : (
                    <NavLink to='/login' className='cursor-pointer'>Get Started</NavLink>
                )}
            </div>
        </div>
    );
}

export default Navbar;
