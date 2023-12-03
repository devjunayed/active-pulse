import { FaBalanceScale, FaUserClock, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import "./Dashboard.css";


const AdminMenu = () => {
    return <ul className="dashboard menu text-xl ">
        <li><NavLink to="/dashboard/all-subscribers"><FaUsers /> All Subscribers</NavLink></li>
        <li><NavLink to="/dashboard/all-trainers"><FaChalkboardTeacher /> All Trainers</NavLink></li>
        <li><NavLink to="/dashboard/applied-trainers"><FaUserClock /> Applied Trainers</NavLink></li>
        <li><NavLink to="/dashboard/balance"><FaBalanceScale /> Balance</NavLink></li>
    </ul>

};

export default AdminMenu;