import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { reset } = useForm();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userEmail === 'example' && password === 'password') {
            // successful login
        } else {
            setError('Invalid username or password');
        }
    };
    const handleLogin = (data) => {
        reset();
    };
    const handleClearForm = () => {
        reset();
    };

    return (
        <body>
            <div className="bg-orange-300 form-box">
                <h2 className="font-bold text-4xl text-center">Log In</h2> <br>
                </br>
                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className='loginForm flex flex-col mt-4 items-center'>
                    <div classname="flex flex-col">
                        <div className="form-group text-center">
                            <label htmlFor="email" >Email:</label>
                            <input
                                type="text"
                                placeholder='e.g. user@email.com'
                                value={userEmail}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group text-center">
                            <label>Password:</label>
                            <input
                                type="password"

                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="mt-4 mr-2   font-bold border-2 w-1/2 cursor-pointer border-green-500 rounded-md hover:bg-amber-800 hover:text-white p-2 py-px"
                            type="submit">Login



                        </button>
                        <button
                            onClick={handleClearForm}
                            className="font-bold mt-4 ml-2 w-1/2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white p-2 text-center"
                        >
                            <p>Clear</p>
                        </button>

                    </div>
                    <Link to="/register">
                        <p className="mt-8">
                            Don't have an account yet?
                            <span className="text-blue-400 font-bold ml-2">Register</span>
                        </p>
                    </Link>

                    {error && <div className="error-message text-center">{error}</div>}
                </form>


            </div >
        </body>
    );
};

export default Login;
