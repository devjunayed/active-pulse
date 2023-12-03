import PropTypes from 'prop-types';


const Feature = ({title, description, logo}) => {
    return (
        <div className="card  card-compact mx-4 bg-base-100 border-ap-orange border-2 p-4">
            <div className='md:text-5xl text-2xl lg:text-9xl text-center mx-auto text-ap-green'>{logo}</div>
            <div className="card-body mx-1 flex md:h-[50vh] flex-col">
                <h2 className="card-title text-lg lg:text-2xl">{title}</h2>
                <p className='text-md md:text-xl flex-grow'>{description}</p>
            </div>
        </div>
    );
};

Feature.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    logo: PropTypes.node
}

export default Feature;