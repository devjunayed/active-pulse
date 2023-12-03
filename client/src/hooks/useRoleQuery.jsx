import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRoleQuery = () => {
    const  {user} = useAuth();
    const secureAxios= useAxiosSecure();

    return useQuery(
        {
            queryKey: [user?.email, 'users-data'],
            queryFn: async () => {
                const res = await secureAxios(`/user?email=${user?.email}`);
                return res.data;
            }
        }
    )
};

export default useRoleQuery;