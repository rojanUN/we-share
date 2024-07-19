import React from 'react';

const Navbar: React.FC = () => {
    return (
        <div className="bg-blue-900 text-white flex items-center justify-between p-4 md:p-6">
            <div className="font-bold text-sm md:text-base">
                Welcome to We-Share App
            </div>
            <div className="flex items-center space-x-4">
                <button className="bg-gray-700 p-2 rounded text-xs md:text-sm">
                    Sign out
                </button>
                <div className="bg-gray-700 p-2 rounded-full text-xs md:text-sm">
                    MK
                </div>
            </div>
        </div>
    );
};

export default Navbar;
