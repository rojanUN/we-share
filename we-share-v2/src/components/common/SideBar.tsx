import React, { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FaHome, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
        { path: '/manage-user', label: 'Manage User', icon: <FaUserPlus /> },
        {
            path: '/quiz-manage',
            label: 'Quiz Manage',
            icon: <AiOutlineSetting />,
        },
        { path: '/add-exam', label: 'Exam Manage', icon: <AiOutlineSetting /> },
        { path: '/', label: 'Options', icon: <AiOutlineSetting /> },
        { path: '/', label: 'Options', icon: <AiOutlineSetting /> },
    ];

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen hidden md:block ">
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
                            <span className="mr-3 flex-shrink-0 flex items-center">
                                {item.icon}
                            </span>{' '}
                            <span className="flex-1">{item.label}</span>{' '}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
