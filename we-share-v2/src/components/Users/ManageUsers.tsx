import { useEffect, useState } from 'react';
import UserTable from './UsersTable';
import UserModal from './UserModal';
import { FaUserPlus } from 'react-icons/fa';
import { getUsers } from '../../services/userServices';
import { UserInterface } from '../../interfaces/UserInterface';

const ManageUsers = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);


    const handleAddUser = (user: UserInterface) => {
        setUsers([...users, { ...user }]);
        setIsModalOpen(false);
    };
    const handleToggleStatus = (userId: number) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : user
        ));
    };
    const getUserData = async () => {
        const response = await getUsers();
        console.log("this is response", response);
        if (response) {
            setUsers(response);
        }
    }

    useEffect(() => {
        getUserData();
    }, [users]);



    const handleEditUser = (updatedUser: UserInterface) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setIsModalOpen(false);
    };

    const handleDeleteUser = (userId: number) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    return (
        <div className="container mx-auto p-4" >
            <div className='flex justify-end'>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                        setCurrentUser(null);
                        setIsModalOpen(true);
                    }}
                >
                    <div className='flex justify-center items-center gap-2'>
                        Add User <FaUserPlus />
                    </div>
                </button>
            </div>
            <UserTable users={users} onEdit={(user) => {
                setCurrentUser(user);
                setIsModalOpen(true);
            }} onDelete={handleDeleteUser} onToggleStatus={handleToggleStatus} />
            {isModalOpen && (
                <div>
                    <UserModal
                        user={currentUser}
                        onClose={() => setIsModalOpen(false)}
                        onSave={currentUser ? handleEditUser : handleAddUser}
                    />
                </div>

            )}
        </div>
    );
};

export default ManageUsers;
