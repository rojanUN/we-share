import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/SideBar';
import Navbar from '../common/Navbar';


const Layout: React.FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
