import React, { useState } from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ExamPortal from './pages/ExamPortal';
import Home from './pages/Home';
import ExamCompletion from './pages/ExamCompletion';
import ExamDeviceCheck from './pages/ExamDeviceCheck';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Dashboard/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import ExamManage from './components/Dashboard/Exam/ExamManage';
import LoginPage from './components/Login/LoginPage';
import ManageUsers from './components/Users/ManageUsers';

const App = () => {
    const [canAccessExamPortal, setCanAccessExamPortal] = useState(false);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/exam-playground',
            element: (
                <ExamDeviceCheck
                    setCanAccessExamPortal={setCanAccessExamPortal}
                />
            ),
        },
        {
            path: '/exam-portal',
            element: canAccessExamPortal ? (
                <ExamPortal />
            ) : (
                <ExamDeviceCheck
                    setCanAccessExamPortal={setCanAccessExamPortal}
                />
            ),
        },
        {
            path: '/exam-completed',
            element: <ExamCompletion />,
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />,
                },
                {
                    path: '/quiz-manage',
                    element: <ExamManage />,
                },
                {
                    path: '/manage-user',
                    element: <ManageUsers />,
                },
            ],
        },
    ]);

    return (
        <React.StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Provider>
        </React.StrictMode>
    );
};
export default App;

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
