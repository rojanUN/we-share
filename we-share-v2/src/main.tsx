import React from 'react';
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

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/exam-playground',
        element: <ExamDeviceCheck />,
    },
    {
        path: '/exam-portal',
        element: <ExamPortal />,
    },
    {
        path: '/exam-completed',
        element: <ExamCompletion />,
    },
    {
        path: "/login",
        element: <LoginPage />
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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
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
