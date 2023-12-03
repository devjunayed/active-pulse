import SectionTitle from '../../../../components/SectionTitle';
import Feature from '../Feature/Feature';
import { RiTimerFlashLine } from "react-icons/ri";
import { BiDumbbell } from "react-icons/bi";
import { FaHandHoldingHand, FaPuzzlePiece } from "react-icons/fa6";
import { MdOutlineSnowshoeing } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Featured.css';

const Featured = () => {
    // getting screen width for slider responsive ness
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var slidesNo = 3;


    if(screenWidth <= 500){
        slidesNo = 1;
    }else if(screenWidth <= 768){
        slidesNo = 2;
    }else{
        slidesNo = 3;
    }

    console.log(screenWidth);
    return (
        <div>
            <SectionTitle
                title="Featured"
            />

            {/* Swiper slider */}
            <Swiper
                slidesPerView={slidesNo}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                speed={200}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Feature
                        title="Intuitive Tracking"
                        description="Showcase the ease of tracking workouts, progress, and fitness goals with ActivePulse. Highlight user-friendly features for effortless monitoring."
                        logo={<RiTimerFlashLine />} />
                </SwiperSlide>
                <SwiperSlide>
                    <Feature
                        title="Expert Trainers"
                        description="Highlight the expertise of the trainers available on the platform. Mention their qualifications, specialties, and how they can contribute to users' fitness journeys."
                        logo={<BiDumbbell />} />
                </SwiperSlide>
                <SwiperSlide>
                <Feature
                    title="Community Connection"
                    description="Emphasize the sense of community within ActivePulse. Showcase how users can connect, share experiences, and support each other in their fitness endeavors."
                    logo={<FaHandHoldingHand />} />
                </SwiperSlide>
                <SwiperSlide>
                    

                <Feature
                    title="Personalized Workouts"
                    description="Feature the platform's ability to tailor workouts based on individual fitness levels, preferences, and goals. Highlight the personalized approach to fitness."
                    logo={<FaPuzzlePiece />} />
                </SwiperSlide>
                <SwiperSlide>
                    
                <Feature
                    title="Comprehensive Classes"
                    description="Showcase the variety of fitness classes available, ranging from cardio and strength training to yoga and specialized programs. Illustrate the diversity to cater to different interests."
                    logo={<MdOutlineSnowshoeing />} />
                </SwiperSlide>
                <SwiperSlide>
                    
                <Feature
                    title="Real-Time Progress"
                    description="Highlight how users can monitor their progress in real-time, providing instant feedback and motivation for achieving fitness milestones."
                    logo={<FaChartLine />} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Featured;