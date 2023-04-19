import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {
    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (userEmail === 'example' && password === 'password') {
            // successful login
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <body>
            <div className="bg-orange-300">
                <h2 className="font-bold text-4xl text-center">Log In</h2> <br>
                </br>
                <form onSubmit={handleSubmit}
                    className='loginForm flex flex-col mt-4"'>

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
                    <button className="mt-4 mr-2   font-bold border-2 w-1/2 cursor-pointer border-green-500 rounded-md hover:bg-amber-800 hover:text-white p-2 "
                        type="submit">Login


                    </button>

                    {error && <div className="error-message text-center">{error}</div>}
                </form>
                <Link to="/register">
                    <p className="mt-8 underline-offset-2 text-center">
                        Don't have an account yet?
                        <span className="text-blue-400 font-bold ml-2">Register</span>
                    </p>
                </Link>

            </div >
        </body>
    );
};

export default Login;
