import { Link, NavLink } from 'react-router-dom';
import LogoImg from '../../../assets/images/logo.png';
import "./Navbar.css";
import { FaSignInAlt } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import useRoleQuery from '../../../hooks/useRoleQuery';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const { data: role = {} } = useRoleQuery();

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/gallery">Gallery </NavLink></li>
        <li><NavLink to="/trainer">Trainer </NavLink></li>
        <li><NavLink to="/classes">Classes </NavLink></li>

        {
            role.role === 'admin' &&
            <li><NavLink to="/dashboard/all-subscribers">Dashboard</NavLink></li>
        }
        {
            role.role === 'trainer' &&
            <li><NavLink to="/dashboard/manage-slots">Dashboard</NavLink></li>
        }
        {
            role.role === 'member' &&
            <li><NavLink to="/dashboard/activity">Dashboard</NavLink></li>
        }

        <li><NavLink to="/community">Community</NavLink></li>
    </>
    return (
        <div className="navbar bg-slate-50 p-4">
            <div className="navbar-start  items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul className="menu menu-sm uppercase text-center dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <span className="">
                    <img className='w-1/2' src={LogoImg} alt="" />
                </span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu text-center uppercase gap-1 menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <>
                            <Link onClick={logOut} className="btn">Logout <FaSignInAlt /></Link>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="" src={`${user.photoURL}`} />
                                    </div>
                                </div>
                                <ul className="mt-3 z-[1] p-4 bg-black text-white shadow menu menu-sm dropdown-content  rounded-box ">
                                    <li className='text-2xl font-bold mb-4'>{user.displayName}</li>
                                    <li>{user.email}</li>

                                </ul>
                            </div>
                        </>
                        :
                        <>
                            <Link to="login" className="btn">Login <FaSignInAlt /></Link>
                        </>
                }

            </div>
        </div>
    );
};

export default Navbar;