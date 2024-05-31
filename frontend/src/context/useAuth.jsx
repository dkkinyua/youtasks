import { useContext } from 'react';
import { AuthContext } from './createcontext';

const useAuth = () => useContext(AuthContext);


export default useAuth;