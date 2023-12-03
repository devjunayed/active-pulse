import { Link } from 'react-router-dom';
import ErrorImg from '../../assets/images/error.jpg';
import { FaHome } from 'react-icons/fa';


const ErrorPage = () => {
    return (
        <div className='text-center  flex flex-col justify-center items-center h-screen overflow-y-hidden'>
            <h2 className='text-2xl font-bold'>Oops Page Not Found!</h2>
            <img className='w-6/12 mx-auto' src={ErrorImg} alt="" />
            <button className='btn btn-outline mx-auto'><Link to="/" className='flex gap-2 text-lg items-center'>Go Home <FaHome /></Link></button>
        </div>
    );
};

export default ErrorPage;