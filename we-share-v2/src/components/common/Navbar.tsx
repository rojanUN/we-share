import React from 'react';



const Navbar: React.FC = () => {
    const name = "Rohan Rana Magar";
    const initials = name.split(" ").map(word => word[0].toUpperCase());

    const displayInitials = initials.length >= 2
        ? initials.slice(0, 2).join("")
        : initials[0] + initials[0];


    return (
        <div className="bg-blue-900 text-white flex items-center justify-between p-4 md:p-6">
            <div className="font-bold text-sm md:text-base">
                Welcome to We-Share App
            </div>
            <div className="flex items-center space-x-4">
                <button className="bg-white text-black p-2 rounded text-xs md:text-sm">
                    Sign out
                </button>
                <div className="bg-white text-black p-2 rounded-full text-xs md:text-sm">
                    {displayInitials}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
