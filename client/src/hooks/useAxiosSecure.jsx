import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const secureAxios = axios.create({
    baseURL: "http://localhost:5000",
    // baseURL: "https://active-pulse.vercel.app",
})


const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();


    secureAxios.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = token;
        return config;
    }, function (err) {
        return Promise.reject(err);
    });

    secureAxios.interceptors.response.use(function (response) {
        return response;
    }, async (err) => {
        const status = err.response.status;

        if (status === 401 || status === 403) {
            await logOut();
            navigate("/login");
        }
        return Promise.reject(err);
    })

    return secureAxios;
};

export default useAxiosSecure;