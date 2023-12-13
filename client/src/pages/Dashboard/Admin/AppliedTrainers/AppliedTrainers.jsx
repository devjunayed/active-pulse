import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../../components/SectionTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { ImEye } from "react-icons/im";
import Swal from 'sweetalert2';


const AppliedTrainers = () => {

    const secureAxios = useAxiosSecure();


    const { data: pendingTrainers = [], refetch, isFetching, isPending } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const trainer = await secureAxios.get("/pending/trainers");
            return trainer.data;
        }
    })


    const handleView = (trainer) => {
        const date = new Date();

        delete trainer._id;

        trainer.joiningDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        Swal.fire({
            title: `${trainer?.fullName}`,
            imageUrl: `${trainer?.photoURL}`,
            imageHeight: 200,
            width: 800,
            text: `Email: ${trainer?.email}`,
            html: `<div >
                
                <div style="text-align: left; ">
                    <div>Email: ${trainer?.email}</div>
                    <div>Age: ${trainer?.age}</div>
                    <div>Experience: ${trainer?.experience} years of experince</div>
                    <div style="margin-top: 10px;">Social Links</div>
                    <div>-----------------------------------</div>
                    <div>Facebook Link: <a style="color: blue;" href=${trainer?.facebookLink}> ${trainer?.facebookLink}</a></div>
                    <div>Linkedin Link: <a style="color: blue;" href=${trainer?.facebookLink}> ${trainer?.linkedinLink}</a></div>
                    <div>Youtube Link Link: <a style="color: blue;" href=${trainer?.facebookLink}> ${trainer?.youtubeLink}</a></div>
                </div>
             <div style="display: flex; gap: 20px;">
             <div style="text-align: left; margin-top: 20px;">
             <h2>Skills:</h2> 
             <div>----------------------------------</div>
             <div>Skill 1: ${trainer?.checkedSkill[0]?.skill}</div>
             <div>Skill 2: ${trainer?.checkedSkill[1]?.skill}</div>
             <div>Skill 3: ${trainer?.checkedSkill[2]?.skill}</div>
             <div>Skill 4: ${trainer?.checkedSkill[3]?.skill}</div>
             <div>Skill 5: ${trainer?.checkedSkill[4]?.skill}</div>
             <div>Skill 6: ${trainer?.checkedSkill[5]?.skill}</div>
             <div>Skill 7: ${trainer?.checkedSkill[6]?.skill}</div>
             <div>Skill 8: ${trainer?.checkedSkill[7]?.skill}</div>
             <div>Skill 9: ${trainer?.checkedSkill[8]?.skill}</div>
             <div>Skill 10: ${trainer?.checkedSkill[9]?.skill}</div>
        </div>
        <div style="text-align: left; margin-top: 20px;">
             <h2>Slots:</h2> 
             <div>----------------------------------</div>
             <div>Slot 1: ${trainer?.slots[0]?.slot}</div>
             <div>Slot 2: ${trainer?.slots[1]?.slot}</div>
             <div>Slot 3: ${trainer?.slots[2]?.slot}</div>
             <div>Slot 4: ${trainer?.slots[3]?.slot}</div>
             <div>Slot 5: ${trainer?.slots[4]?.slot}</div>
             <div>Slot 6: ${trainer?.slots[5]?.slot}</div>
             <div>Slot 7: ${trainer?.slots[6]?.slot}</div>
             <div>Slot 8: ${trainer?.slots[7]?.slot}</div>
           
        </div>
             </div>
            </div>
  `,
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "#d33",
            cancelButtonText: "Reject",
            confirmButtonText: "Confirmation"
        }).then((result) => {
            // if (result.isConfirmed) {
            //     Swal.fire({
            //         title: "Deleted!",
            //         text: "Your file has been deleted.",
            //         icon: "success"
            //     });
            // }
            if (result.isConfirmed) {
                secureAxios.put("/user/to/trainer", trainer)
                    .then(() => {
                        Swal.fire({
                            title: "Approved!",
                            text: `${trainer.fullName} is now a trainer`,
                            icon: "success"
                        });
                        refetch();
                    })
            }
        })
    }

    return (
        <div>
            {
                isFetching || isPending ? <div className='h-screen flex justify-center items-center'><span className='loading'></span></div> : <div>
                    <SectionTitle title="Applied Trainers" className="my-0" />
                    <div className="overflow-x-auto rounded-xl">

                        {pendingTrainers.length === 0 ? <div className='h-[50vh] flex items-center justify-center'>

                            <h2 className='text-center text-red-500 text-3xl'>No Applied Trainers found</h2>

                        </div> :
                            <table className="table">
                                {/* head */}
                                <thead className='bg-ap-green text-lg'>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Applying Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pendingTrainers.map((trainer, index) => <tr key={trainer._id}>
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
                                            <td>{trainer.appliedDate}</td>
                                            <th>
                                                <button className="btn text-xl" onClick={() => handleView(trainer)}><ImEye /></button>
                                            </th>
                                        </tr>)
                                    }

                                </tbody>

                            </table>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default AppliedTrainers;