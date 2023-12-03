import TrainerBg from '../../assets/images/trainer.jpg';
import OverlyBanner from '../../components/OverlyBanner';
import SectionTitle from '../../components/SectionTitle';
import ButtonTransparent from '../../components/ButtonTransparent';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./Trainer.css";


const Trainer = () => {
    const publicAxios = useAxiosPublic();
    const [trainers, setTrainers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const numberOfPages = Math.ceil(count/6);
    const pages = [...Array(numberOfPages).keys()];

    useEffect(()=>{
        publicAxios.get("/total-trainers")
        .then(data => {
            console.log(data.data)
            setCount(data.data.count);
        });
    }, [publicAxios]);

    useEffect(()=>{
        publicAxios.get(`/trainers?page=${currentPage}&size=${6}`)
        .then(data => setTrainers(data.data))
    }, [currentPage, publicAxios]);

    return (
        <div>
            <OverlyBanner title="Our Trainers" bgImg={TrainerBg} />

            {/* Trainers */}
            <SectionTitle title="Trainers" />
            {(count > 0) ?
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>{
                    trainers.map((trainer) =>  <div key={trainer._id} className="card bg-base-100 shadow-xl">
                        <figure><img src={trainer.photoURL} alt="" className='rounded-full w-2/3' /></figure>
                        <div className="card-body">
                            <div className='flex flex-col flex-grow'>
                                <h2 className="card-title">{trainer.fullName}</h2>
                                <div className='flex gap flex-wrap gap-1'>
                                    <span className='badge badge-outline'>{trainer.checkedSkill[0]?.skill}</span>
                                    <span className='badge badge-outline'>{trainer.checkedSkill[1]?.skill}</span>
                                    <span className='badge badge-outline'>{trainer.checkedSkill[2]?.skill}</span>

                                    {
                                        trainer.checkedSkill.length > 3 &&
                                        <span className='badge badge-outline'>......</span>
                                    }

                                </div>
                                <h2 className='flex-grow'>{trainer.experience} years of experience</h2>
                                <h2 className='text-lg font-bold mt-4 mb-2'>Available Time Slots:</h2>
                                <div className='grid grid-cols-1 gap-2'>
                                    {
                                        trainer?.slots?.map((slot, index) => <Link className='btn' disabled={!slot.isAvailable} key={index}
                                        to={`/book/${trainer._id}/${slot.slot}`}
                                        >
                                            Slot {index+1}: {slot.slot}
                                        </Link>)
                                    }
                                </div>
                            </div>
                            <div className="card-actions flex flex-col">
                                <div className="flex flex-grow mx-auto gap-4 my-4 text-2xl ">
                                    {trainer.facebookLink && <Link to={trainer.facebookLink}  ><FaFacebookF className='border cursor-pointer p-2 rounded-full text-blue-500 text-5xl' /></Link>}
                                    {trainer.linkedinLink && <Link to={trainer.linkedinLink} ><FaLinkedinIn className='border cursor-pointer p-2 rounded-full text-blue-700 text-5xl' /></Link>}
                                    {trainer.youtubeLink && <Link to={trainer.youtubeLink}  ><FaYoutube className='border cursor-pointer p-2 rounded-full text-red-500 text-5xl' /></Link>}
                                </div>

                                <Link to={`/trainer-details/${trainer._id}`} className="btn btn-outline mx-auto">Know More</Link>
                            </div>
                        </div>
                    </div>

                    )}
                </div>
                : <div className='text-center text-5xl w-full mx-auto text-red-600'>We are out of trainers</div>
            }


            {/* pagination */}
            <div className='text-xl flex gap-4 justify-center mt-10'>
                {
                    pages.map(page => <button
                    className={currentPage === page ? 'selected' : undefined}
                    onClick={()=>{
                        setCurrentPage(page)
                    }}
                    key={page}>
                        {page+1}
                    </button>)
                }
            </div>

            {/* CTA */}
            <SectionTitle title="CTA" />
            <div className="card text-center bg-ap-green shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl text-zinc-600 text-center mx-auto">Unlock Your Potential as a Fitness Trainer with Us!</h2>
                    <p className='max-w-lg mx-auto text-light-gray'>Are you a fitness enthusiast with a passion for helping others achieve their health and wellness goals? We&lsquo;re looking for dedicated individuals like you to join our team of trainers!</p>
                    <div className="card-actions justify-center">
                        <ButtonTransparent to="/become-trainer" title="Become a Trainer" className="border-black mt-4" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trainer;