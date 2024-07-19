import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen hidden md:block">
            <div className="p-4 font-bold">We-Share-V2</div>
            <ul>
                <li className="p-4 hover:bg-gray-700 cursor-pointer"><Link to="/dashboard">Dashboard</Link></li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer"><Link to="/">Options</Link></li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer"><Link to="/exam-manage">Exam Management</Link></li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer"><Link to="/">Options</Link></li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer"><Link to="/">Options</Link></li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer"><Link to="/">Options</Link></li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer"><Link to="/">Options</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
