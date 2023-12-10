import  { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';

const useAuth = () => {
    const Auth = useContext(AuthContext);
    return Auth;
};



export default useAuth;