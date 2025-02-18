import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function CardModal({ onClose }) {
    const [title,setTitle] = useState('');
    const [error,setError] = useState('');

    const handleError = (e) => {
        if(!title.trim()){
            setError('Project title cannot be empty');
            e.preventDefault();
        }
        else{
            setError('');
        }
    }
    return (
        <>
            <div className='fixed inset-0 backdrop-blur-sm bg-opacity-10 flex justify-center items-center z-50'>
                <div className='bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-md flex flex-col gap-4'>
                    <h3 className='text-xl font-semibold text-gray-700'>Enter the name of the project</h3>
                    <input 
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setError('');
                        }}
                        type="text" 
                        placeholder='FullStack Developer' 
                        className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    <div className='flex justify-end gap-2'>
                        <NavLink to='/resume'
                            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
                            onClick={handleError}
                        >
                            Create
                        </NavLink>
                        <button 
                            onClick={onClose} 
                            className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardModal;
