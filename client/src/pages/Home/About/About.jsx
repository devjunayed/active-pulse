import SectionTitle from '../../../components/SectionTitle';
import AboutUs from '../../../assets/images/about-us.svg';
import ButtonTransparent from '../../../components/ButtonTransparent';


const About = () => {
    return (
        <div>
            <SectionTitle title="About Us" />
            <div className="hero min-h-[80vh]">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={AboutUs} className="md:w-1/2" />
                    <div className='md:w-1/2'>
                        <h1 className="text-xl md:text-2xl lg:text-5xl font-bold">What is Active Pulse!</h1>
                        <p className="py-6">Elevate your fitness journey with ActivePulse. We&lsquo;re more than a tracker; we&lsquo;re your personalized wellness guide. Join us for intuitive tracking, tailored workouts, and a vibrant community. Let&lsquo;s make fitness an enjoyable and achievable adventure together!</p>
                      <div className='flex justify-center md:justify-start'>
                      <ButtonTransparent title="Join the Movement"/>
                      </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;