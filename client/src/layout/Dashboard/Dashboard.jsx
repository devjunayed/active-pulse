import { Link,  Outlet } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import TrainerMenu from "./TrainerMenu";
import MemberMenu from "./MemberMenu";
import Logo from '../../assets/images/logo.png';
import {  FaHome } from "react-icons/fa";
import "./Dashboard.css";
import useRoleQuery from "../../hooks/useRoleQuery";


const Dashboard = () => {


    const { data: userData = {} } = useRoleQuery();


    return (
        <div className="flex">
            <div className="w-4/12  text-left pt-5 bg-black relative text-white h-screen">
                <div className=" text-center mx-auto">
                    <img className="w-1/3 mx-auto" src={Logo} alt="" />
                    <h2 className="text-ap-orange italic uppercase text-xl">Active Pulse</h2>
                </div>
                <div className=" mt-4">
                    {
                        userData.role === "admin" &&
                        <AdminMenu />
                    }
                    {
                        userData.role === "trainer" &&
                        <TrainerMenu />
                    }
                    {
                        userData.role === "member" &&
                        <MemberMenu />
                    }
                </div>
                <div className="absolute bottom-10 text-center left-1/2 -translate-x-1/2">
                    <Link to="/" className="flex items-center gap-2 text-xl"><FaHome /> Home</Link>
                </div>
            </div>
            <div className="mx-10 w-full">
                <Outlet />
            </div>

        </div>
    );
};

export default Dashboard;