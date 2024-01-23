import React, { useEffect } from 'react';

interface LogoutProps {
    dispatch: React.Dispatch<{ type: 'toggle' }>;
    isAuth?: boolean;
}

export const Logout: React.FC<LogoutProps> = ({ dispatch }) => {
    useEffect(() => {
        const handleLogout = async () => {
            try {
                await fetch('http://localhost:4000/logout', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                dispatch({ type: 'toggle' });
            } catch (error) {
                console.error('Logout error:', error);
            }
        };

        handleLogout();
    }, [dispatch]);

    return null;
};
