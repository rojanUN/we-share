import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/', label: 'Options' },
        { path: '/quiz-manage', label: 'Quiz Manage' },
        { path: '/', label: 'Options' },
        { path: '/', label: 'Options' },
        { path: '/', label: 'Options' },
    ];

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen hidden md:block">
            <div className="p-4 font-bold">We-Share-V2</div>
            <ul>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`hover:bg-gray-700 ${activeIndex === index ? 'bg-gray-600' : ''}`}
                    >
                        <Link
                            to={item.path}
                            className=" p-4 w-full h-full flex items-center"
                            onClick={() => handleClick(index)}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
