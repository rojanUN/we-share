import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ExamPortal from './pages/ExamPortal';
import Home from './pages/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/exam-portal',
        element: <ExamPortal />,
    },
    {
        path: '/exam-completed',
        element: (
            <div>
                <p>
                    your answers is submitted. we will revert back to you Thank
                    you!
                </p>
                {/* <a href="/submit">Go To Home</a> */}
            </div>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
