import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import PropTypes from 'prop-types';

const SocialLogin = ({ from }) => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const publicAxios = useAxiosPublic();

    const handleSocialLogin = () => {
        googleSignIn()
            .then(res => {
                if (res.user) {
                    const userInfo = {
                        email: res.user.email,
                        name: res.user.displayName,
                        role: "member"
                    }
                    publicAxios.post("/users", userInfo)
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.acknowledged) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Logged In successfully!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate(from, { replace: true });
                            }

                        })
                }
            })
            .catch(err => {
                console.log(err);
            }
            )

    }

    return <button type="button" onClick={handleSocialLogin} className="btn border-2 border-black btn-ghost"><FcGoogle className="text-3xl" /> Google Sign In</button>
};

SocialLogin.propTypes = {
    from: PropTypes.string
}

export default SocialLogin;