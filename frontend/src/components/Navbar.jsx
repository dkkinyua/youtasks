import { useState } from "react";

const Navbar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div className="text-white flex justify-around items-center p-6">
      <h1 className="text-3xl">
        Youtasks <span className="text-red-700">.</span>
      </h1>

      {/* Desktop Navbar */}
      <div className="hidden sm:flex space-x-4 ">
        <div className="w-42 p-2 border-red-700 border rounded text-center hover:bg-red-700 hover:text-white cursor-pointer">
          Create Task
        </div>
        <div className="w-20 p-2 border-red-700 border rounded text-center hover:bg-red-700 hover:text-white cursor-pointer">
          Log in
        </div>
        <div className="w-24 p-2 bg-red-700 border rounded border-white text-center  hover:bg-white hover:text-red-700 hover:border-red-700 cursor-pointer">
          Sign up
        </div>
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
          <div className="absolute bg-white rounded-md mt-2 right-6">
            <div className="w-24 border-red-700 border hover:bg-red-700 hover:text-white rounded text-center text-black m-2 cursor-pointer">
              Create Task
            </div>
            <div className="w-16 border-red-700 border hover:bg-red-700 hover:text-white rounded text-center text-black m-2 cursor-pointer">
              Log in
            </div>
            <div className="w-16 bg-red-700 border rounded hover:bg-white hover:text-red-700 hover:border-red-700 text-center text-white m-2 cursor-pointer">
              Sign up
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
