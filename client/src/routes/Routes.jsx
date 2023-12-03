import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Login from "../pages/Login/Login";
import Home from '../pages/Home/Home/Home';
import Register from "../pages/Register/Register";
import Trainer from "../pages/Trainer/Trainer";
import Gallery from "../pages/Gallery/Gallery";
import Community from "../pages/Community/Community";
import Classes from "../pages/Classes/Classes";
import Dashboard from "../layout/Dashboard/Dashboard";
import BecomeTrainer from "../pages/BecomeTrainer/BecomeTrainer";
import TrainerDetails from "../pages/TrainerDetails/TrainerDetails";
import BookTrainer from "../pages/BookTrainer/BookTrainer";
import AllSubscribers from "../pages/Dashboard/Admin/AllSubscribers/AllSubscribers";
import AllTrainers from "../pages/Dashboard/Admin/AllTrainers/AllTrainers";
import AppliedTrainers from "../pages/Dashboard/Admin/AppliedTrainers/AppliedTrainers";
import Balance from "../pages/Dashboard/Admin/Balance/Balance";
import PrivateRoutes from "./PrivateRoutes";
import ManageSlots from '../pages/Dashboard/Trainer/ManageSlots/ManageSlots';
import ManageMembers from "../pages/Dashboard/Trainer/ManageMembers/ManageMembers";
import AddForum from "../pages/Dashboard/Trainer/AddForum/AddForum";
import AddClass from "../pages/Dashboard/Trainer/AddClass/AddClass";
import ActivityLog from "../pages/Dashboard/Member/ActivityLog/ActivityLog";
import ProfileSettings from "../pages/Dashboard/Member/ProfileSettings/ProfileSettings";
import RecommendedClasses from "../pages/Dashboard/Member/RecommendedClasses/RecommendedClasses";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login ></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "/trainer",
                element: <Trainer></Trainer>
            },
            {
                path: "gallery",
                element: <Gallery></Gallery>
            },
            {
                path: "community",
                element: <Community></Community>
            },
            {
                path: "classes",
                element: <Classes></Classes>
            },
            {
                path: "become-trainer",
                element: <PrivateRoutes>
                    <BecomeTrainer></BecomeTrainer>
                </PrivateRoutes>
            },
            {
                path: "trainer-details/:id",
                element: <PrivateRoutes>
                    <TrainerDetails></TrainerDetails>
                </PrivateRoutes>,
                loader: ({params})=> params.id
            },
            {
                path: "book/:id/:slot",
                element: <PrivateRoutes>
                    <BookTrainer></BookTrainer>
                </PrivateRoutes>,
                loader: ({params})=> [params.id, params.slot]
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes>
            <Dashboard></Dashboard>
        </PrivateRoutes>,
        errorElement: <ErrorPage />,
        children: [

            // Admin related routes
            {
                path: "all-subscribers",
                element: <PrivateRoutes>
                    <AllSubscribers />
                </PrivateRoutes>
            },
            {
                path: "all-trainers",
                element: <PrivateRoutes>
                    <AllTrainers />
                </PrivateRoutes>
            },
            {
                path: "applied-trainers",
                element: <PrivateRoutes>
                    <AppliedTrainers />
                </PrivateRoutes>
            },
            {
                path: "balance",
                element: <PrivateRoutes>
                    <Balance />
                </PrivateRoutes>
            },
            // Trainer related routes
            {
                path: 'manage-slots',
                element: <PrivateRoutes>
                    <ManageSlots />
                </PrivateRoutes>
            }, 
            {
                path: 'manage-members',
                element: <PrivateRoutes>
                    <ManageMembers />
                </PrivateRoutes>
            },
            {
                path: 'add-forum',
                element: <PrivateRoutes>
                    <AddForum />
                </PrivateRoutes>
            },
            {
                path: 'add-class',
                element: <PrivateRoutes>
                    <AddClass />
                </PrivateRoutes>
            },
            // basic member related routes
            {
                path: "activity",
                element: <PrivateRoutes>
                    <ActivityLog/>
                </PrivateRoutes>
            },
            {
                path: "settings",
                element: <PrivateRoutes>
                    <ProfileSettings />
                </PrivateRoutes>
            },
            {
                path: "recommended",
                element: <PrivateRoutes>
                    <RecommendedClasses/>
                </PrivateRoutes>

            }
        ]
    }
])

export default routes;