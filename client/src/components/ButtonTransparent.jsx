import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ButtonTransparent = ({title, className, to}) => {
    return  <Link to={to} className={`${className} btn bg-ap-green text-[#495057] hover:bg-green-50`}>{title}</Link>;
};

ButtonTransparent.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    to: PropTypes.string,
}
export default ButtonTransparent;