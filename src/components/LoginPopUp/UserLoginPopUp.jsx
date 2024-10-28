import axios from 'axios';
import { useState } from 'react';
import { assets } from '../../assets/assets';
import './UserLoginPopUp.css';

const UserLoginPopUp = ({ setShowLogin, setUserType }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentState, setCurrentState] = useState("LOG IN");

    // Password validation function
    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_+{}[\]:;"'<>,.?/])[A-Za-z\d@!#$%^&*()_+{}[\]:;"'<>,.?/]{8,}$/.test(password);
    };

    // Sign-up logic
    const signUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.');
            return;
        }

        try {
            await axios.post('http://localhost:3001/user/signUp', {
                name: username,
                email: email,
                password: password
            });

            setSuccessMessage('Account created successfully!');
            setUsername('');
            setEmail('');
            setPassword('');
            setCurrentState("LOG IN");
        } catch (err) {
            setError(err.response?.data?.error || 'Error during sign-up. Please try again.');
        }
    };

    // User login logic
    const logIn = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const result = await axios.post('http://localhost:3001/users/login', {
                name: username,
                password: password
            });

            if (result.data === 'success') {
                setSuccessMessage('Logged in successfully!');
                setUserType('user'); // Set user type to 'user'
                setShowLogin(false); // Close the login popup
            } else {
                setError('Invalid login credentials. Please try again.');
            }
        } catch (err) {
            setError('Error during login. Please try again.');
        }
    };

    // Admin login logic
    const adminLogIn = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const result = await axios.post('http://localhost:3001/admin/login', {
                name: username,
                password: password
            });

            if (result.data === 'success') {
                setSuccessMessage('Admin logged in successfully!');
                setUserType('admin'); // Set user type to 'admin'
                setShowLogin(false); // Close the login popup
            } else {
                setError('Invalid admin login credentials. Please try again.');
            }
        } catch (err) {
            setError('Error during admin login. Please try again.');
        }
    };

    // Form submission handler
    const checkSubmission = (e) => {
        if (currentState === "Sign Up") {
            signUp(e);
        } else if (currentState === "ADMIN LOGIN") {
            adminLogIn(e);
        } else {
            logIn(e);
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={checkSubmission} className="login-popup-container">
                <div className='login-popup-title'>
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.close} alt="close" />
                </div>
                <div className="login-popup-inputs">
                    {/* Show username only for sign-up */}
                    {currentState === "Sign Up" && (
                        <input
                            type="text"
                            placeholder='Your name'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    )}
                    {/* Show email input for all login types */}
                    <input
                        type="email"
                        placeholder='Your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {/* Password input for all states */}
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Display any errors */}
                {error && <p className="error-message">{error}</p>}

                {/* Display success message */}
                {successMessage && <p className="success-message">{successMessage}</p>}

                {/* Submit button */}
                <button type='submit' id='button1'>
                    {currentState === "Sign Up" ? "Create Account" : "Log In"}
                </button>
                <button id='button2'>
                    {currentState !== "Sign Up" ? "Log In With Google" : "Sign Up With Google"}
                    <img onClick={() => setShowLogin(false)} src={assets.google} alt="Google Login" />
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {/* Links for switching between states */}
                {currentState !== "ADMIN LOGIN" && (
                    currentState === "LOG IN"
                        ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>CLICK HERE</span></p>
                        : <p>Already have an account?<span onClick={() => setCurrentState("LOG IN")}> LOGIN HERE</span></p>
                )}
                {currentState === "LOG IN" && (
                    <a>Login As an Admin <span onClick={() => setCurrentState("ADMIN LOGIN")}>CLICK HERE</span></a>
                )}
            </form>
        </div>
    );
};

export default UserLoginPopUp;
