import { Link } from 'react-router-dom';
import SectionTitle from '../../../components/SectionTitle';
import useTrainers from '../../../hooks/useTrainers';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const TeamSection = () => {

    const { data, isLoading } = useTrainers();
    console.log(data);
    return (
        <div>
            {
                !isLoading && data.length !== 0 &&
                <div><SectionTitle title="Our Team" /></div>
            }
            {
                !isLoading &&
                <div className='grid gap-4 gird-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        data[0] && <div className="card  card-compact mx-4 bg-base-100 border-ap-orange border-2 p-4">

                            <img className='w-1/2 mx-auto rounded-full' src={data[0].photoURL} alt="" />
                            <div className='text-xl md:text-3xl text-center mt-10 mx-auto text-ap-green'>{data[0]?.fullName}</div>
                            <div className="flex flex-grow mx-auto gap-4 my-4 text-2xl ">
                                {data[0].facebookLink && <Link to={data[0].facebookLink}  ><FaFacebookF className='border cursor-pointer p-2 rounded-full text-blue-500 text-5xl' /></Link>}
                                {data[0].linkedinLink && <Link to={data[0].linkedinLink} ><FaLinkedinIn className='border cursor-pointer p-2 rounded-full text-blue-700 text-5xl' /></Link>}
                                {data[0].youtubeLink && <Link to={data[0].youtubeLink}  ><FaYoutube className='border cursor-pointer p-2 rounded-full text-red-500 text-5xl' /></Link>}
                            </div>
                        </div>
                    }
                    {
                        data[1] &&
                        <div className="card  card-compact mx-4 bg-base-100 border-ap-orange border-2 p-4">

                            <img className='w-1/2 mx-auto rounded-full' src={data[1].photoURL} alt="" />
                            <div className='text-xl md:text-3xl text-center mt-10 mx-auto text-ap-green'>{data[1]?.fullName}</div>
                            <div className="flex flex-grow mx-auto gap-4 my-4 text-2xl ">
                                {data[1].facebookLink && <Link to={data[1].facebookLink}  ><FaFacebookF className='border cursor-pointer p-2 rounded-full text-blue-500 text-5xl' /></Link>}
                                {data[1].linkedinLink && <Link to={data[1].linkedinLink} ><FaLinkedinIn className='border cursor-pointer p-2 rounded-full text-blue-700 text-5xl' /></Link>}
                                {data[1].youtubeLink && <Link to={data[1].youtubeLink}  ><FaYoutube className='border cursor-pointer p-2 rounded-full text-red-500 text-5xl' /></Link>}
                            </div>
                        </div>
                    }
                    {
                        data[2] &&
                        <div className="card  card-compact mx-4 bg-base-100 border-ap-orange border-2 p-4">
                            <img className='w-1/2 mx-auto rounded-full' src={data[2].photoURL} alt="" />
                            <div className='text-xl md:text-3xl text-center mt-10 mx-auto text-ap-green'>{data[2]?.fullName}</div>
                            <div className="flex flex-grow mx-auto gap-4 my-4 text-2xl ">
                                {data[2].facebookLink && <Link to={data[2].facebookLink}  ><FaFacebookF className='border cursor-pointer p-2 rounded-full text-blue-500 text-5xl' /></Link>}
                                {data[2].linkedinLink && <Link to={data[2].linkedinLink} ><FaLinkedinIn className='border cursor-pointer p-2 rounded-full text-blue-700 text-5xl' /></Link>}
                                {data[2].youtubeLink && <Link to={data[2].youtubeLink}  ><FaYoutube className='border cursor-pointer p-2 rounded-full text-red-500 text-5xl' /></Link>}
                            </div>
                        </div>
                    }

                </div>
            }
        </div>
    );
};

export default TeamSection;