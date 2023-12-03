import BannerImg from '../../../assets/images/banner.svg';
import ButtonTransparent from '../../../components/ButtonTransparent';

const Banner = () => {
    return (
        <div className="hero min-h-[80vh]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={BannerImg} className="w-full md:w-1/2 rounded-lg " />
                <div className='w-full md:w-1/2'>
                    <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">Elevate Your Fitness with Active Pulse</h1>
                    <p className="py-6">Your ultimate fitness companion. Track, train, and transform with ActivePulse. Join now for a healthier you</p>
                    <div className='flex justify-center md:justify-start'>
                   <ButtonTransparent className="uppercase " to="/classes" title="Classes"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;