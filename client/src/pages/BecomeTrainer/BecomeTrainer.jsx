import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BecomeTrainer = () => {
    const secureAxios = useAxiosSecure();
    const navigate = useNavigate();

    const { user } = useAuth();
    const [checkedSkill, setCheckedSkill] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubmit = (data) => {


        const slots = Array.from({ length: data.dayTime }, (_, index) => {
            var startHour = 9 + index * 1;
            var endHour = startHour + 1;

            var startAmPm = "am";
            var endAmPm = "am";

            if (startHour >= 12) {
                startAmPm = "pm";
                if (startHour > 12) {
                    startHour = startHour - 12;
                }
            }

            if (endHour >= 12) {
                endAmPm = "pm";
                if (endHour > 12) {
                    endHour = endHour - 12;
                }
            }

            return {slot: `${startHour}:00${startAmPm} - ${endHour}:00${endAmPm}`, isAvailable: true};
        }
        )
        const newTrainerInfo = {
            ...data,
            checkedSkill,
            slots,
            appliedDate: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
        }

        secureAxios.post("/trainer/new", newTrainerInfo)
            .then(res => {
                if (res.data.acknowledged) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Application submitted!",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    navigate("/trainer");
                }
                if (res.data.exists) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Already pending one application!",
                        showConfirmButton: false,
                        timer: 3500
                    });
                    navigate("/trainer");
                }
            })
            .catch(err => console.log(err));

    }

    const skills = [
        "Communication Skills",
        "Knowledge of Anatomy and Physiology",
        "Adaptability",
        "Motivation Skills",
        "Nutritional Knowledge",
        "Patience",
        "Empathy",
        "Organization and Time management",
        "Teaching Skills",
        "Continuous Learning"
    ]

    const handleSkill = (e, item) => {
        if (e.target.checked) {
            [
                setCheckedSkill([
                    ...checkedSkill,
                    {
                        skill: item,
                    }
                ])
            ]
        } else {
            setCheckedSkill(checkedSkill.filter((skill) => skill.skill !== item));
        }
    }




    return (
        <div>
            <SectionTitle title="Become a Trainer" />
            <form className="card-body w-8/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Full Name</span>
                    </label>
                    <input type="text" {...register("fullName", { required: true })} placeholder="name" className="input input-bordered" />
                    {errors.fullName?.type === "required" && (
                        <span className="text-sm text-red-400 text-right mt-2">Name is required</span>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" readOnly defaultValue={user.email}  {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                    {errors.email?.type === "required" && (
                        <span className="text-sm text-red-400 text-right mt-2">Email is required</span>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Age</span>
                    </label>
                    <input type="number" min={16} max={60}  {...register("age", { required: true, min: 16, max: 80 })} placeholder="age" className="input input-bordered" />
                    {errors.age?.type === "required" && (
                        <span className="text-sm text-red-400 text-right mt-2">Age is required</span>
                    )}
                    {errors.age?.type === "min" && (
                        <span className="text-sm text-red-400 text-right mt-2"> Age must be greater than or equal 16</span>
                    )}
                    {errors.age?.type === "max" && (
                        <span className="text-sm text-red-400 text-right mt-2"> Age must be smaller than or equal to 80</span>
                    )}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Profile Image</span>
                    </label>
                    <input type="text"  {...register("photoURL", { required: true })} placeholder="photo url" className="input input-bordered" />
                    {errors.photoURL?.type === "required" && (
                        <span className="text-sm text-red-400 text-right mt-2">PhotoURL is required</span>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Skills</span>
                    </label>
                    <div className="grid grid-cols-2 ml-2">
                        {
                            skills.map((item, index) => <div key={index}>
                                <label>
                                    <input type="checkbox" onChange={(e) => handleSkill(e, item)} value={checkedSkill} />
                                    <span className="ml-2">{item}</span>
                                </label>
                            </div>)
                        }

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Available Time in a Week</span>
                        </label>
                        <input type="number" min={4} max={48} {...register("weekTime", { required: true })} placeholder="Available time in a week (ex: 30)" className="input input-bordered" />
                        {errors.password?.type === "required" && (
                            <span className="text-sm text-red-400 text-right mt-2">Available time is required</span>
                        )}
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Available Time in a Day</span>
                    </label>
                    <input type="number" min={1} max={8} {...register("dayTime", { required: true })} placeholder="Available time in a week (ex: 6)" className="input input-bordered" />
                    {errors.dayTime?.type === "required" && (
                        <span className="text-sm text-red-400 text-right mt-2">Available time is required</span>
                    )}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Years of experience</span>
                    </label>
                    <input type="number" min={1}  {...register("experience", { required: true })} placeholder="experience in year(ex: 6)" className="input input-bordered" />
                    {errors.password?.type === "required" && (
                        <span className="text-sm text-red-400 text-right mt-2">Year of experience is required</span>
                    )}
                </div>
                <div className="flex gap-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Facebook profile link</span>
                        </label>
                        <input type="text"  {...register("facebookLink")} placeholder="facebook profile link" className="input input-bordered" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Linkedin profile link</span>
                        </label>
                        <input type="text"  {...register("linkedinLink")} placeholder="linkedin profile link" className="input input-bordered" />

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">YouTube channel link</span>
                        </label>
                        <input type="text"  {...register("youtubeLink")} placeholder="youtube channel link" className="input input-bordered" />
                        {errors.password?.type === "required" && (
                            <span className="text-sm text-red-400 text-right mt-2">Year of experience is required</span>
                        )}
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-ap-green text-black">Apply</button>
                </div>
            </form >
        </div >
    );
};

export default BecomeTrainer;