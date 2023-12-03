import BannerBg from '../../assets/images/banner.jpg';
import OverlyBanner from "../../components/OverlyBanner";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Image1 from '../../assets/images/gallery/1.jpg';
import Image2 from '../../assets/images/gallery/2.jpg';
import Image3 from '../../assets/images/gallery/3.jpg';
import Image4 from '../../assets/images/gallery/4.jpg';
import Image5 from '../../assets/images/gallery/5.jpg';
import Image6 from '../../assets/images/gallery/6.jpg';
import Image7 from '../../assets/images/gallery/7.jpg';
import Image8 from '../../assets/images/gallery/8.jpg';
import Image9 from '../../assets/images/gallery/9.jpg';
import Image10 from '../../assets/images/gallery/10.jpg';
import Image11 from '../../assets/images/gallery/11.jpg';
import Image12 from '../../assets/images/gallery/12.jpg';
import Image13 from '../../assets/images/gallery/13.jpg';
import Image14 from '../../assets/images/gallery/14.jpg';
import Image15 from '../../assets/images/gallery/15.jpg';
import Image16 from '../../assets/images/gallery/16.jpg';
import Image17 from '../../assets/images/gallery/17.jpg';
import Image18 from '../../assets/images/gallery/18.jpg';
import Image19 from '../../assets/images/gallery/19.jpg';
import Image20 from '../../assets/images/gallery/20.jpg';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

const Gallery = () => {
    const { loading } = useAuth();

    const Images = [
        Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10, Image11, Image12, Image13, Image14, Image15, Image16, Image17, Image18, Image19, Image20,];

    const [viewImages, setViewImages] = useState(Images.slice(0, 12));
    const [imageLoading, setImageLoading] = useState(Array.from({ length: Images.length }, () => true));

    const handleImageLoad = (index) => {
        setImageLoading((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    const nextData = () => {
        const newSliceCount = viewImages.length + 3;
        setViewImages(Images.slice(0, newSliceCount));
    };

    return (
        <div>
            <OverlyBanner title="Gallery" bgImg={BannerBg} />
            <InfiniteScroll
                dataLength={viewImages.length}
                next={nextData}
                hasMore={true}
                loader={Images.length > viewImages.length ? <h4 className='text-center text-green-400 text-xl font-bold mt-10'>Loading...</h4> : <h4 className='text-center text-red-400 text-xl font-bold mt-10'>End of the data</h4>}
               
            >
                <div className="grid grid-cols-1 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {viewImages.map((item, index) => (
                        <div key={index}>
                            {loading ? (
                                <Skeleton width={'100%'} height={300} />
                            ) : (
                                <>
                                    {imageLoading[index] && <Skeleton width={'100%'} height={300} />}

                                    <img
                                      
                                        src={item}
                                        style={{ display: imageLoading[index] ? "none" : "block" }}
                                        onLoad={() => handleImageLoad(index)}
                                        alt=""
                                    />

                                </>
                            )}
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Gallery;