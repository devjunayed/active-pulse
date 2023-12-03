import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';


const PrivateRoutes = ({children}) => {
   const {user, loading} = useAuth();
   const location = useLocation();

   if(loading){
    return <div className="mx-auto mt-10 text-xl flex justify-center">
        <span className="loading text-2xl"></span>
    </div>
   }


   if(user){
    return children;
   }
   return <Navigate to="/login" state={{from: location}} replace ></Navigate>

};

PrivateRoutes.propTypes = {
    children: PropTypes.node
}

export default PrivateRoutes;