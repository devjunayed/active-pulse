import SectionTitle from '../../../../components/SectionTitle';
import useTrainers from '../../../../hooks/useTrainers';


const AllTrainers = () => {

    const { data: trainers = [] } = useTrainers();


    return (
        <div>
            <SectionTitle title="All Trainers" className="my-0" />
            <div className="overflow-x-auto rounded-xl">
                {trainers.length === 0 ? <div className='h-[50vh] flex items-center justify-center'>

                    <h2 className='text-center text-red-500 text-3xl'>No  Trainers found</h2>

                </div> :
                    <table className="table">
                        {/* head */}
                        <thead className='bg-ap-green text-lg'>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Joined Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                trainers.map((trainer, index) => <tr key={trainer._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={trainer.photoURL} />
                                                </div>
                                            </div>
                                            <div>
                                                {trainer.fullName}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{trainer.email}</td>
                                    <td>{trainer.joiningDate}</td>
                                    <th>
                                        <button className="btn btn-outline btn-md">Pay</button>
                                    </th>
                                </tr>)
                            }

                        </tbody>

                    </table>}
            </div>
        </div>
    );
};

export default AllTrainers;