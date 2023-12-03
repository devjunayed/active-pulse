import { Link, useLoaderData } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import OverlyBanner from "../../components/OverlyBanner";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrainerDetails = () => {
    const trainerId = useLoaderData();
    const secureAxios = useAxiosSecure();
    console.log(trainerId);

    const { data: trainerDetails = [], isLoading } = useQuery({
        queryKey: [trainerId, secureAxios],
        queryFn: async () => {
            const result = await secureAxios(`/trainer/${trainerId}`);
            console.log(result);
            return result.data;
        }
    })

    console.log(trainerDetails);

    return (<>
        {
            !isLoading &&
            <div>
                <OverlyBanner bgImg={trainerDetails.photoURL} title={`Details of ${trainerDetails?.fullName}`} />
                <div className="card p-10 lg:card-side bg-base-100 shadow-xl">
                    <div className="w-1/3 items-center flex"><img src={trainerDetails.photoURL} alt="Album" /></div>
                    <div className="card-body w-2/3">
                        <h2 className="card-title">Name: <span className="font-normal">{trainerDetails.fullName}</span></h2>
                        <h2 className="card-title">Email: <span className="font-normal">{trainerDetails.email}</span></h2>
                        <h2 className="card-title">Age: <span className="font-normal">{trainerDetails.age}</span></h2>
                        <h2 className="card-title">Experience: <span className="font-normal">{trainerDetails.experience} years of experience</span></h2>
                        <h2 className="card-title"><span className="flex gap-2 flex-row flex-wrap font-normal">
                            {
                                trainerDetails?.checkedSkill?.map((skill, index) => <span key={index} className="badge badge-outline">{skill.skill}</span>)
                            }
                        </span></h2>
                        <h2 className='text-lg font-bold mt-4 mb-2'>Available Time Slots:</h2>
                        <div className='grid grid-cols-1 gap-2'>
                            {
                                trainerDetails?.slots?.map((slot, index) => <Link className='btn' key={index}
                                    to={`/book/${trainerDetails._id}/${slot.slot}`}
                                >
                                    Slot {index + 1}: {slot.slot}
                                </Link>)
                            }
                        </div>
                        <div className="card-actions flex flex-col">
                            <div className="flex flex-grow mx-auto gap-4 my-4 text-2xl ">
                                {trainerDetails.facebookLink && <Link to={trainerDetails.facebookLink}  ><FaFacebookF className='border cursor-pointer p-2 rounded-full text-blue-500 text-5xl' /></Link>}
                                {trainerDetails.linkedinLink && <Link to={trainerDetails.linkedinLink} ><FaLinkedinIn className='border cursor-pointer p-2 rounded-full text-blue-700 text-5xl' /></Link>}
                                {trainerDetails.youtubeLink && <Link to={trainerDetails.youtubeLink}  ><FaYoutube className='border cursor-pointer p-2 rounded-full text-red-500 text-5xl' /></Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
    );
};

export default TrainerDetails;