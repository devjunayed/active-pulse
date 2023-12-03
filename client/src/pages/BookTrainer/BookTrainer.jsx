import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import { GiMetalBar } from "react-icons/gi";
import BookCard from "./BookCard";
import { AiFillGolden } from "react-icons/ai";
import { GiDiamondTrophy } from "react-icons/gi";

const BookTrainer = () => {
    const paramData = useLoaderData();
    console.log(paramData);
    return (
        <div>
            <SectionTitle title="Book Trainer" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <BookCard
                    data={paramData}
                    title="Silver"
                    price="49"
                    icon={<GiMetalBar className="" />}
                    s1="✔ Personalized Workout Plans"
                    s2="✔ Nutritional Guidance"
                    s3="✔ Weekly Progress Tracking"
                    s4="✔ Access to Basic Fitness Classes"
                    s5="❌ Customized Fitness Assessments"
                    s6="❌ Advanced Nutritional Counseling"
                    s7="❌ Regular One-on-One Coaching Sessions"
                    s8="❌ Access to Premium Fitness Classes"
                    s9="❌ Comprehensive Health Analysis"
                    s10="❌ Tailored Fitness Programs for Specific Goals"
                    s11="❌ Continuous Monitoring and Adjustments"
                    s12="❌ Exclusive Access to VIP Fitness Events"
                />
                <BookCard
                    data={paramData}
                    title="Gold"
                    price="99"
                    icon={<AiFillGolden className="text-yellow-500"/>}
                    s1="✔ Personalized Workout Plans"
                    s2="✔ Nutritional Guidance"
                    s3="✔ Weekly Progress Tracking"
                    s4="✔ Access to Basic Fitness Classes"
                    s5="✔ Customized Fitness Assessments"
                    s6="✔ Advanced Nutritional Counseling"
                    s7="✔ Regular One-on-One Coaching Sessions"
                    s8="✔ Access to Premium Fitness Classes"
                    s9="❌ Comprehensive Health Analysis"
                    s10="❌ Tailored Fitness Programs for Specific Goals"
                    s11="❌ Continuous Monitoring and Adjustments"
                    s12="❌ Exclusive Access to VIP Fitness Events"
                />
                <BookCard
                    data={paramData}
                    price="129"
                    title="Diamond"
                    icon={<GiDiamondTrophy className="text-green-400"/>}
                    s1="✔ Personalized Workout Plans"
                    s2="✔ Nutritional Guidance"
                    s3="✔ Weekly Progress Tracking"
                    s4="✔ Access to Basic Fitness Classes"
                    s5="✔ Customized Fitness Assessments"
                    s6="✔ Advanced Nutritional Counseling"
                    s7="✔ Regular One-on-One Coaching Sessions"
                    s8="✔ Access to Premium Fitness Classes"
                    s9="✔ Comprehensive Health Analysis"
                    s10="✔ Tailored Fitness Programs for Specific Goals"
                    s11="✔ Continuous Monitoring and Adjustments"
                    s12="✔ Exclusive Access to VIP Fitness Events"
                />
            </div>
        </div>
    );
};

export default BookTrainer;