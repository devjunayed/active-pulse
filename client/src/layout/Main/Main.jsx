import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../pages/Shared/Navbar/Navbar";
import Footer from "../../pages/Shared/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    const location = useLocation().pathname.split("/")[1];
    const noHeaderFooter = (location === 'login' || location === 'register');
    return (
        <div>

            
            {noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
            <ToastContainer />
        </div>
    );
};

export default Main;