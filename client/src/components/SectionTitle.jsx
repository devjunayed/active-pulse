import PropTypes from 'prop-types';


const SectionTitle = ({ title, className }) => {
    return (
        <div className="text-center my-10">
            <h2 className={`${className} font-Montserrat text-2xl uppercase`}>{title}</h2>
            <div>
                <div className='flex justify-center gap-2 mt-2'>
                    <div className="w-14 h-1 bg-gray-400"></div>
                    <div className="w-14 h-1 bg-gray-400"></div>
                </div>
                <div className='flex justify-center gap-2'>
                    <div className="w-10 h-1 bg-gray-400"></div>
                    <div className="w-6   h-1 bg-red-400"></div>
                    <div className="w-10 h-1 bg-gray-400"></div>
                </div>
                <div className='flex justify-center gap-2'>
                    <div className="w-14 h-1 bg-gray-400"></div>
                    <div className="w-14 h-1 bg-gray-400"></div>
                </div>
            </div>
        </div>
    );
};

SectionTitle.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
}

export default SectionTitle;