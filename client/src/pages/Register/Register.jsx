import { Helmet } from "react-helmet-async";
import RegisterImg from '../../assets/images/login.svg';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import SocialLogin from "../../components/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Register = () => {
    const navigate = useNavigate();
    const { createUser, updateUserData } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const publicAxios = useAxiosPublic();


    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error('Password do not matched!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            createUser(data?.email, data?.password)
                .then((res) => {
                    const user = res.user;
                    if (user) {
                        updateUserData(data.name, data.photoURL)
                            .then(() => {
                                const userInfo = {
                                    email: user.email,
                                    name: user.displayName,
                                    role: "member"
                                }
                                publicAxios.post("/users", userInfo)
                                    .then((res) => {
                                        if (res.data.acknowledged) {
                                            Swal.fire({
                                                position: "center",
                                                icon: "success",
                                                title: "Account created successfully",
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            navigate("/");
                                        }

                                    })

                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
                .catch(err => {
                    if(err.code === 'auth/email-already-in-use'){
                        toast.error('Email already in use!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                })
        }
    }

    return (
        <div>
            <Helmet>
                <title>Active Pulse | Register</title>
            </Helmet>


            <div className="hero min-h-screen flex flex-col items-center justify-center">
                <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
                    <div className="text-center w-1/2  lg:text-left">
                        <img src={RegisterImg} alt="" />
                    </div>
                    <div className="card shrink-0 w-1/2">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.name?.type === "required" && (
                                    <span className="text-sm text-red-400 text-right mt-2">Name is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email?.type === "required" && (
                                    <span className="text-sm text-red-400 text-right mt-2">Email is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="photo url" className="input input-bordered" />
                                {errors.photoURL?.type === "required" && (
                                    <span className="text-sm text-red-400 text-right mt-2">PhotoURL is required</span>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password"  {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === "required" && (
                                        <span className="text-sm text-red-400 text-right mt-2">Password is required</span>
                                    )}
                                </div>
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password"  {...register("confirmPassword", { required: true })} placeholder="confirm password" className="input input-bordered" />
                                    {errors.confirmPassword?.type === "required" && (
                                        <span className="text-sm text-red-400 text-right mt-2">Confirm password is required</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn bg-ap-green text-black">Register</button>
                            </div>
                            <div className="text-center flex flex-col gap-2">
                                OR
                                <SocialLogin />
                                <div>
                                    Already have an account? <Link to="/login">login</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;