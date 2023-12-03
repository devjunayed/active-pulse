import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useTrainers = () => {

    const secureAxios = useAxiosSecure();

    return useQuery({
        queryKey: ['trainers'],
        queryFn: async () => {
            const allTrainer = await secureAxios.get("/trainers");
            return allTrainer.data;
        }
    })
};

export default useTrainers;