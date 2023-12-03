import SectionTitle from "../../../../components/SectionTitle";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../../hooks/useAxiosSecure";



const AllSubscribers = () => {
    const secureAxios = useAxiosSecure();

    const { data: newsLetter = [] } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const newsLetter = await secureAxios.get("/newsletter");
            return newsLetter.data;
        }
    })

    return (
        <div>
            <div>
                <SectionTitle title={"All Subscribers"} />
                <div className="overflow-x-auto rounded-xl">
                    {newsLetter.length === 0 ? <div className='h-[50vh] flex items-center justify-center'>

                        <h2 className='text-center text-red-500 text-3xl'>No Subscribers found</h2>

                    </div> :
                        <table className="table table-zebra ">
                            {/* head */}
                            <thead className="bg-ap-green">
                                <tr className="">
                                    <th></th>
                                    <th className="font-bold text-lg">Name</th>
                                    <th className="font-bold text-lg">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    newsLetter.map((letter, index) => <tr key={letter._id}>
                                        <td>{index + 1}</td>
                                        <td>{letter.name}</td>
                                        <td>{letter.email}</td>
                                    </tr>)

                                }

                            </tbody>
                        </table>}
                </div>
            </div>
        </div>
    );
};

export default AllSubscribers;