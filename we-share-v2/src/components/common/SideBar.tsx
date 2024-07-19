import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai'; // Add additional icons as needed

const Sidebar: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
        { path: '/', label: 'Options', icon: <AiOutlineSetting /> }, // Example icon
        { path: '/quiz-manage', label: 'Quiz Manage', icon: <AiOutlineSetting /> }, // Example icon
        { path: '/', label: 'Options', icon: <AiOutlineSetting /> }, // Example icon
        { path: '/', label: 'Options', icon: <AiOutlineSetting /> }, // Example icon
        { path: '/', label: 'Options', icon: <AiOutlineSetting /> }, // Example icon
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
                            className="p-4 w-full h-full flex items-center"
                            onClick={() => handleClick(index)}
                        >
                            <span className="mr-3 flex-shrink-0 flex items-center">{item.icon}</span> {/* Icon */}
                            <span className="flex-1">{item.label}</span> {/* Text */}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
