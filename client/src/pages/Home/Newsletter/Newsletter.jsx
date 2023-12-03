import SectionTitle from '../../../components/SectionTitle';
import { useForm} from "react-hook-form"
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const Newsletter = () => {
    const {register,handleSubmit, reset} = useForm();
    const publicAxios = useAxiosPublic();

    const onSubmit = (data) => {
        publicAxios.post("/newsletter", data)
        .then(res => {
            if(res.data.acknowledged){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Subscribed Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }else if(res.data.err){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Already subscribed",
                    showConfirmButton: false,
                    timer: 3500
                  });
            }
            reset();
        })
    }
    return (
        <div>
            <div>
                <SectionTitle title="Newsletter" />
            </div>
            <div className="bg-ap-green mx-2 lg:mx-0 p-10 rounded-xl shadow-xl">

                <h2 className='text-center mb-8  text-xl md:text-2xl uppercase'>Subscribe to get the latest news</h2>
                <form className="" onSubmit={handleSubmit(onSubmit)} >
                    <div className=" gap-4 flex flex-col md:flex-row md:w-8/12 mx-auto">
                        <input {...register("name")} type="text" placeholder="name" className=" md:w-1/2 input input-bordered" required />
                        <input {...register("email")} type="email" placeholder="email" className="input md:w-1/2 input-bordered" required />
                        <button className="btn btn-outline">Subscribe Now</button>
                    </div>

                </form>

            </div>
        </div>

    );
};

export default Newsletter;