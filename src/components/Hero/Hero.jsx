import React from 'react'
import styles from "./Hero.module.css"
import { FaYoutube, FaReddit, FaFacebook, FaBriefcase, FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

function Hero() {
    return (
        <>
            <div className='mt-[100px]'>
                <div className={styles.maxWidth}>
                    
                    {/* Heading Section */}
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className={styles.headingLanguage}>
                            Build Your Resume <span className={styles.spanLanguage}>With AI</span>
                        </h1>
                        <h3 className='text-3xl text-gray-600 text-center md:text-4xl'>
                            Effortlessly craft a resume that lands you interviews!
                        </h3>
                        <NavLink to='/login' className='bg-fuchsia-600 text-white p-4 rounded-lg cursor-pointer font-bold m-4'>
                            Get Started
                        </NavLink>
                    </div>

                    {/* Featured In Section */}
                    <div className='flex flex-col justify-center items-center m-2'>
                        <h3 className='text-4xl font-semibold text-gray-800'>Featured In</h3>
                        <div className='flex justify-around w-full md:w-[700px] text-[20px] md:text-[30px] text-gray-600 m-4 font-bold p-4 flex-wrap'>
                            <div className='flex items-center m-2'>
                                <FaYoutube className='m-2 text-red-500' />
                                <p>YouTube</p>
                            </div>
                            <div className='flex items-center m-2'>
                                <FaReddit className='m-2 text-orange-600' />
                                <p>Reddit</p>
                            </div>
                            <div className='flex items-center m-2'>
                                <FaFacebook className='m-2 text-blue-600' />
                                <p>Facebook</p>
                            </div>
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className='mt-10'>
                        <h2 className='text-center text-4xl font-semibold text-gray-800'>How It Works?</h2>
                        <div className='flex flex-wrap justify-center gap-6 m-6'>

                            {/* Card 1 */}
                            <div className='card w-full md:w-[300px]'>
                                <FaBriefcase className='text-4xl text-fuchsia-600 mx-auto mb-2' />
                                <h3 className='font-bold text-xl'>Create Your Profile</h3>
                                <p>Fill in your details and let AI craft a resume that stands out.</p>
                            </div>

                            {/* Card 2 */}
                            <div className='card w-full md:w-[300px]'>
                                <FaFileAlt className='text-4xl text-fuchsia-600 mx-auto mb-2' />
                                <h3 className='font-bold text-xl'>Choose a Template</h3>
                                <p>Pick from a variety of professional templates designed for success.</p>
                            </div>

                            {/* Card 3 */}
                            <div className='card w-full md:w-[300px]'>
                                <FaCheckCircle className='text-4xl text-fuchsia-600 mx-auto mb-2' />
                                <h3 className='font-bold text-xl'>Download & Apply</h3>
                                <p>Download your resume and start applying for your dream job.</p>
                            </div>

                        </div>
                    </div>

                    {/* LastButton */}
                    <div className='flex justify-center items-center m-4'>
                        <NavLink to='/login' className='bg-red-600 text-white p-4 text-xl rounded-lg cursor-pointer'>Get Started Button</NavLink>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Hero;
