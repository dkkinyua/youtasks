import { useState, useEffect } from "react";
import Loginmodal from "./loginmodal";
import { Createtaskmoadal } from "./Createtaskmoadal";
import { Signupmoadal } from "./Signupmoadal";
import useAuth from "../context/useAuth";

const Navbar = () => {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [loginopen, setLoginopen] = useState(false);
    const [signupopen, setSignupopen] = useState(false);
    const [createtask, setCreatetask] = useState(false);
    const { user, checkUserStatus } = useAuth(); 

    useEffect(() => {
        checkUserStatus();
    }, );

    const handleSignOut = () => {
        try {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/";
        } catch (err) {
            console.log(err);
        }
    };

    const actionButtons = (label, action, style) => (
        <div
            className={`w-24 p-2 border rounded text-center cursor-pointer ${style}`}
            onClick={action}
        >
            {label}
        </div>
    );

    return (
        <>
            <div className="text-white flex justify-around items-center p-6">
                <a href="/" className="flex items-center">
                    <h1 className="text-3xl">
                        Youtasks <span className="text-red-700">.</span>
                    </h1>
                </a>

                {/* Desktop Navbar */}
                <div className="hidden sm:flex space-x-4">
                    {actionButtons("Create Task", () => setCreatetask(true), "border-red-700 hover:bg-red-700 hover:text-white w-32")}
                    {user
                        ? actionButtons("Log out", handleSignOut, "bg-red-700 border-white hover:bg-white hover:text-red-700 hover:border-red-700")
                        : <>
                            {actionButtons("Log in", () => setLoginopen(true), "border-red-700 hover:bg-red-700 hover:text-white")}
                            {actionButtons("Sign up", () => setSignupopen(true), "bg-red-700 border-white hover:bg-white hover:text-red-700 hover:border-red-700")}
                          </>}
                </div>

                {/* Mobile Navbar */}
                <div className="sm:hidden">
                    <svg
                        onClick={() => setToggleDropdown(!toggleDropdown)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 fill-red-700 cursor-pointer"
                        viewBox="0 0 448 512"
                        aria-label="Menu"
                    >
                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                    {toggleDropdown && (
                        <div className="absolute bg-white rounded-md mt-2 right-6 z-10">
                            {actionButtons("Create Task", () => setCreatetask(true), "border-red-700 hover:bg-red-700 hover:text-white m-2 text-black")}
                            {user
                                ? actionButtons("Log out", handleSignOut, "bg-red-700 hover:bg-white hover:text-red-700 hover:border-red-700 m-2 text-white")
                                : <>
                                    {actionButtons("Log in", () => setLoginopen(true), "border-red-700 hover:bg-red-700 hover:text-white m-2 text-black")}
                                    {actionButtons("Sign up", () => setSignupopen(true), "bg-red-700 hover:bg-white hover:text-red-700 hover:border-red-700 m-2 text-white")}
                                  </>}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Logging in */}
            {loginopen && <Loginmodal loginopen={loginopen} close={() => setLoginopen(false)} />}

            {/* Modal for Signing up */}
            {signupopen && <Signupmoadal signupopen={signupopen} close={() => setSignupopen(false)} />}

            {/* Modal for Creating Task */}
            {createtask && <Createtaskmoadal createtask={createtask} close={() => setCreatetask(false)} />}
        </>
    );
};

export default Navbar;
