import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import MainPage from './components/MainPage/MainPage';
import Register from './components/Register/Register';
import ResumePage from './components/ResumePage/ResumePage';
import Navbar from './components/Navbar/Navbar';
import CardPage from './components/CardPage/CardPage';

function AllRoutes() {
    return (
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="" element={<LandingPage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="resume-page" element={<MainPage />} />
                <Route path="resume" element={<ResumePage />} /> {/* For creating new resume */}
                <Route path="card-page" element={<CardPage />} />
                <Route path="resume/:id" element={<ResumePage />} /> {/* For editing existing resume */}
            </Routes>
        </HashRouter>
    );
}

export default AllRoutes;
