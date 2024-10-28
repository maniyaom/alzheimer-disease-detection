import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';
import Loading from '../components/Loading';
import LoadingSuccessFailure from '../components/LoadingSuccessFailure';
import Navbar from '../components/Navbar';

export default function Login() {
    const navigate = useNavigate();

    const [alerts, setAlerts] = useState({});

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified)
                    navigate('/Home');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAlerts({ alertProcess: true, message: 'Logging in, please wait...' });
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                if (userCredential.user.emailVerified) {
                    // const token = await userCredential.user.getIdToken();
                    setAlerts({ alertFinish: true, success: true, message: 'Login Successful' });
                    setTimeout(() => {
                        setAlerts({});
                        navigate('/Home');
                    }, 1000);
                    // console.log('Token:', token);
                    setAuthError(null);
                } else {
                    setAlerts({ alertFinish: true, success: false, message: 'Login Failed' });
                    setTimeout(() => {
                        setAlerts({});
                        setAuthError("Email is not verified, please verify your email to login.");
                    }, 1000);
                }
            }

        } catch (error) {
            setAlerts({ alertFinish: true, success: false, message: 'Login Failed' });
            setTimeout(() => {
                setAlerts({});
                setAuthError(error.message);
            }, 1000);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified)
                    navigate('/Home');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <Navbar />
            <div>
                {alerts.alertProcess && <Loading message={alerts.message} />}
                {alerts.alertFinish && <LoadingSuccessFailure success={alerts.success} message={alerts.message} />}
                <div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
                    <div className="relative">

                        <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
                            <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' /></svg>
                        </div>
                        <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
                            <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' /></svg>
                        </div>
                        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
                            <div className="flex-auto p-6">
                                <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                                    <a href="#" className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                                        <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100">Alzheimer Disease Detection</span>
                                    </a>
                                </div>
                                <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome to Alzheimer Disease Detection</h4>
                                <p className="mb-6 text-gray-500">Please sign-in to access your account</p>

                                <form className="mb-4" onSubmit={handleLogin}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="mb-2 inline-block text-sm font-medium text-gray-700">Email or Username</label>
                                        <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="email" placeholder="Enter your email" autoFocus=""
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex justify-between align-center">
                                            <label className="mb-2 inline-block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                                            <Link to="/ForgotPassword" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">
                                                <small>Forgot Password?</small>
                                            </Link>
                                        </div>
                                        <div className="relative flex w-full flex-wrap items-stretch">
                                            <input type="password" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="password" placeholder="Enter your Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{authError}</p>
                                    </div>
                                    <div className="mb-4">
                                        <button className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-base font-semibold text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">Sign in</button>
                                    </div>
                                </form>

                                <p className="mb-4 text-center">
                                    New on Alzheimer Disease Detection?
                                    <Link to="/SignUp" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"> Create an account </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}