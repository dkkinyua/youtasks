import  { useState } from 'react';
import PropTypes from 'prop-types';
import createApi from './api';
import { AuthContext } from './createcontext';



export const AuthProvider = ({ children }) => {
    const api = createApi();
    const [user, setUser] = useState(null);

    const handleCreateUser = async (email, username, password) => {
        try {
            const res = await api.post('/signup', {
                email,
                username,
                password,
            });
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSignIn = async (username, password) => {
        try {
            const res = await api.post('/signin', {
                username,
                password,
            });
            console.log(res);
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            setUser({ username });
        } catch (err) {
            console.log(err);
        }
    };

    const handleSignOut = async () => {
        try {
            const res = await api.post('/signout');
            console.log(res);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const value = {
        user,
        handleCreateUser,
        handleSignIn,
        handleSignOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
