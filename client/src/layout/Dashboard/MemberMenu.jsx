import { FaCog, FaFile, FaHistory } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const MemberMenu = () => {
    return <ul className="dashboard menu text-xl ">
    <li><NavLink to="/dashboard/activity"><FaHistory /> Activity Log</NavLink></li>
    <li><NavLink to="/dashboard/settings"><FaCog /> Profile Settings</NavLink></li>
    <li><NavLink to="/dashboard/recommended"><FaFile /> Recommended Calsses</NavLink></li>
</ul>
};

export default MemberMenu;