import { Helmet } from "react-helmet-async";
import SocialLogin from "../../components/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginImg from '../../assets/images/login.svg';
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const location = useLocation();

    const from = location?.state?.from?.pathname || "/";

    const onSubmit = (data) => {

        signIn(data.email, data.password)
            .then(res => {
                if(res.user){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Logged In successfully!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate(from, {replace: true});
                }
            })
            .catch(err => {
                console.log(err.message, err.code)

                if (err.code === "auth/invalid-login-credentials") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Invalid credentials",
                    });
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something wents wrong!",
                    });
                }

            });
    }


    return (
        <div>
            <Helmet>
                <title>Active Pulse | Login</title>
            </Helmet>
            <div className="hero min-h-screen flex flex-col items-center justify-center">
                <div className="hero-content flex-col gap-10 lg:flex-row">
                    <div className="text-center w-1/2  lg:text-left">
                        <img src={LoginImg} alt="" />
                    </div>
                    <div className="card shrink-0 w-1/2">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
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
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <span className="text-sm text-red-400 text-right mt-2">Password is required</span>
                                )}
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn bg-ap-green text-black">Log In</button>
                            </div>
                            <div className="text-center flex flex-col gap-2">
                                OR
                                <SocialLogin from={from} />
                                <div>
                                    Already have an account? <Link to="/register">Register</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;