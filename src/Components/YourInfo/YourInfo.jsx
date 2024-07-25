import React, { useContext, useEffect, useState } from "react";
import style from "./YourInfo.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function YourInfo() {
    const { user } = useContext(UserContext);
    const [localUser, setLocalUser] = useState({ name: "", email: "", role: "" });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('User'));
        if (userData) {
            setLocalUser(userData);
        }
    }, []);

    return (
        <div className="md:min-h-[500px] w-full justify-center flex items-center">
            <div className="shadow bg-white/75 w-full  my-8 text-xl  p-4 rounded">
                <div className="row w-full pt-3 g-5">
                    <div className="flex">
                        <div className="me-1 pb-4">
                            <i className="fa-solid fa-user py-1 px-3 bg-slate-50 rounded-full" />
                        </div>
                        <div>
                            <h4 className="font-bold  md:text-xl text-[20px]">
                                Your Info
                            </h4>
                            <p className="my-2  md:text-xl text-[15px]">
                                <span className="bg-slate-50 capitalize md:text-xl opacity-75">
                                    Name:{' '}
                                </span>
                                {user.name || localUser.name}
                            </p>
                            <p className="my-2  md:text-xl text-[15px]">
                                <span className="bg-slate-50 capitalize md:text-xl opacity-75">
                                    Email:{' '}
                                </span>
                                {user.email || localUser.email}
                            </p>
                            <p className="my-2  md:text-xl text-[15px]">
                                <span className="bg-slate-50 capitalize md:text-xl opacity-75">
                                    Role:{' '}
                                </span>
                                {user.role || localUser.role}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="update">
                    <div className="p-3  hover:text-[#3bb77e] bg-slate-50 flex items-center  my-4  cursor-pointer rounded-lg hover:shadow-md transition-all   duration-300">
                        <Link to='/ResetPassword' className="flex items-center ">
                            <i className="fa-solid fa-wrench me-2" />
                            <span className="font-bold lg:text-xl text-md  text-nowrap">Update Your Password</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}
