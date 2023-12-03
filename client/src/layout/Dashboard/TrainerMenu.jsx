import {NavLink} from 'react-router-dom';
import { FaClock, FaDumbbell, FaEdit, FaUsers } from "react-icons/fa";

const TrainerMenu = () => {
    return <ul className="dashboard menu text-xl ">
        <li><NavLink to="/dashboard/manage-slots"><FaClock /> Manage Slots</NavLink></li>
        <li><NavLink to="/dashboard/manage-members"><FaUsers /> Manage Members</NavLink></li>
        <li><NavLink to="/dashboard/add-forum"><FaEdit /> Add New Forum</NavLink></li>
        <li><NavLink to="/dashboard/add-class"><FaDumbbell /> Add New Class</NavLink></li>
    </ul>
};

export default TrainerMenu;