import useAuth from "../../hooks/useAuth";
import PropTypes from 'prop-types';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const BookCard = ({data, title, price, icon, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12}) => {
    const secureAxios = useAxiosSecure();
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleJoin = () => {
        const packageDetail = {
            userName: user.displayName,
            userEmail: user.email,
            package: title,
            trainerId: data[0],
            slot: data[1],
            packagePrice: price,
            packageServices: {
                service1: s1,
                service2: s2,
                service3: s3,
                service4: s4,
                service5: s5,
                service6: s6,
                service7: s7,
                service8: s8,
                service9: s9,
                service10: s10,
                service11: s11,
                service12: s12,
            }
        }
        secureAxios.post(`/book/item/${data[0]}`, packageDetail)
        .then(res => {
            if(res.data.acknowledged){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Joined Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate("/trainer");
            }
            if(res.data.err){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Already booked by someone",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate("/trainer");

            }
        }).catch(err => console.log(err))
    }

    return (
        <div className="card  bg-base-100 shadow-xl">
            <div className="mx-auto text-7xl text-slate-400 mt-4">{icon}</div>
            <div className="card-body">
                <div className="flex justify-between"><h2 className="card-title">{title}</h2> <span>${price} <span className="text-slate-400">per/month</span></span></div>
                <p>{s1}</p>
                <p>{s2}</p>
                <p>{s3}</p>
                <p>{s4}</p>
                <p>{s5}</p>
                <p>{s6}</p>
                <p>{s7}</p>
                <p>{s8}</p>
                <p>{s9}</p>
                <p>{s10}</p>
                <p>{s11}</p>
                <p>{s12}</p>
                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-outline" onClick={handleJoin}>Join Now</button>
                </div>
            </div>
        </div>
    );
};

BookCard.propTypes = {
    data: PropTypes.array,
    icon: PropTypes.node,
    price: PropTypes.string,
    title: PropTypes.string,
    s1: PropTypes.string,
    s2: PropTypes.string,
    s3: PropTypes.string,
    s4: PropTypes.string,
    s5: PropTypes.string,
    s6: PropTypes.string,
    s7: PropTypes.string,
    s8: PropTypes.string,
    s9: PropTypes.string,
    s10: PropTypes.string,
    s11: PropTypes.string,
    s12: PropTypes.string,
}

export default BookCard;