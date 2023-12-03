import axios from 'axios';

const publicAxios = axios.create({
    baseURL: "https://active-pulse.vercel.app"
})
const useAxiosPublic = () => {
    return publicAxios;
};

export default useAxiosPublic;