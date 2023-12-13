import axios from 'axios';

const publicAxios = axios.create({
    baseURL: "http://localhost:5000",
    // baseURL: "https://active-pulse.vercel.app",
})
const useAxiosPublic = () => {
    return publicAxios;
};

export default useAxiosPublic;