import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { SessionStorage } from '../../helper/sessionStorage';

function PrivateRoute({ children }: React.PropsWithChildren<any>) {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Simulate fetching authentication status
        const isLoggedIn = SessionStorage.getSessionItem('authtoken');
        setIsLoggedIn(isLoggedIn);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <>{children}</>;
}

export default PrivateRoute;
