import React, { useContext, useState } from "react";
import logo from '../../assets/logo.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CardContext } from "../../Context/CardContext";
export default function Navbar() {
    let { CountCard, WithlistCount, setWithlistCount } = useContext(CardContext);
    const [isOpen, setIsOpen] = useState(false);
    let { Token, setToken } = useContext(UserContext)
    let navigate = useNavigate()
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    function logOut() {
        localStorage.removeItem('Token');
        localStorage.removeItem('User');
        setToken(null);
        navigate('/');
    };
    return (
        <nav className='sticky z-[100] inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            <div className="max-w-[1400px] flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex gap-5 justify-center items-center">
                    <h1>
                        <NavLink to="/">

                            <img src={logo} className="h-8n" alt="Logo" />
                        </NavLink>
                    </h1>
                    {Token !== null && <ul className="hidden lg:flex flex-col font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <NavLink to="/" className="block text-md py-2 px-3 md:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 md:hover:bg-transparent md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/AllProducts" className="block text-md py-2 px-3 md:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 md:hover:bg-transparent md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Category" className="block text-md py-2 px-3 md:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 md:hover:bg-transparent md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Brand" className="block text-md py-2 px-3 md:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 md:hover:bg-transparent md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands</NavLink>
                        </li>
                    </ul>}

                </div>
                <button onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded={isOpen ? "true" : "false"}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`${isOpen ? "block" : "hidden"} w-full lg:flex lg:w-auto`} id="navbar-solid-bg">
                    {Token !== null && <ul className="flex flex-col justify-center items-center lg:hidden lg:flex-row lg:space-x-8 rtl:space-x-reverse font-medium lg:mt-0 lg:border-0 lg:bg-transparent dark:bg-gray-800 lg:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <NavLink to="/" className="block text-md py-2 px-3 md:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 md:hover:bg-transparent md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/AllProducts" className="block text-md py-2 px-3 md:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 md:hover:bg-transparent md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Category" className="block text-md py-2 px-3 md:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 md:hover:bg-transparent md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Brand" className="block text-md py-2 px-3 md:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 md:hover:bg-transparent md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands</NavLink>
                        </li>
                    </ul>}
                    <ul className="flex flex-col  lg:flex-row justify-between items-center font-medium mt-4 lg:mt-0 lg:space-x-4 rtl:space-x-reverse  lg:border-0 lg:bg-transparent dark:bg-gray-800 lg:dark:bg-transparent dark:border-gray-700">
                        {Token !== null ? <div className="flex justify-between gap-4 items-center">
                            <li className="text-green-500 text-xl cursor-pointer ">
                                <NavLink to='/Heart'>
                                    {WithlistCount > 0 ? <i className="fa-solid text-green-500 text-md fa-heart"></i> : <i className="fa-regular fa-heart  cursor-pointer " ></i>}
                                </NavLink>

                            </li>
                            <li className="text-green-500 text-xl cursor-pointer ">
                                <NavLink className='relative' to='/Card'>
                                    <i className="fa-solid fa-cart-shopping  cursor-pointer "></i>
                                    {CountCard > 0 ? <p className="bg-[#14080e]/90 flex justify-center items-center rounded-full absolute w-[18px] h-[18px] top-[-7px] right-[12px] p-2 font-bold text-white  text-[12px]">{CountCard}</p> : null}
                                </NavLink>
                            </li>
                            <NavLink to='/YourInfo'>
                                <li className="text-green-500 text-xl cursor-pointer ">
                                    <i className="fa-regular fa-circle-user  cursor-pointer "></i>
                                </li>
                            </NavLink>
                            <li>
                                <span onClick={logOut} className="block text-md py-2 px-3 lg:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 lg:hover:bg-transparent lg:border-0 dark:text-white cursor-pointer lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Logout</span>
                            </li>
                        </div> : <div className="flex justify-between gap-4 items-center">
                            <li>
                                <NavLink to="/Login" className="block text-md py-2 px-3 lg:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 lg:hover:bg-transparent lg:border-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Register" className="block text-md py-2 px-3 lg:p-0 text-gray-900 rounded transition-colors duration-300 hover:text-green-600 lg:hover:bg-transparent lg:border-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Register</NavLink>
                            </li>
                        </div>}

                    </ul>
                </div>
            </div>
        </nav>
    );
}
