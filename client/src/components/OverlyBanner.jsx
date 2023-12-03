import PropTypes from 'prop-types';


const OverlyBanner = ({title, bgImg}) => {
    return (
        <div className="hero min-h-[70vh]" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="hero-overlay bg-opacity-80"></div>
            <div className="hero-content text-center text-ap-orange">
                <div className="">
                    <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                </div>
            </div>
        </div>
    );
};

OverlyBanner.propTypes = {
    title: PropTypes.string,
    bgImg: PropTypes.string,

}

export default OverlyBanner;