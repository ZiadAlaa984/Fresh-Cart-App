import React from 'react'
import img1 from '../../assets/slider_main/img1.jpg'
import img2 from '../../assets/slider_main/images2.jpg'
import img3 from '../../assets/slider_main/images3.jpg'
import img4 from '../../assets/slider_main/images4.jpg'
import img5 from '../../assets/slider_main/images5.jpg'
import Slider from "react-slick";
export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        dots: false

    };
    return (
        <div className='max-w-full   mx-auto'>
            <div className='flex md:flex-row flex-col  '>
                <div className='md:w-3/4 w-full'>
                    <Slider {...settings}>
                        <img className='block w-full object-cover max-h-[600px]' src={img1} alt="image1" />
                        <img className='block w-full object-cover max-h-[600px]' src={img2} alt="image2" />
                        <img className='block w-full object-cover max-h-[600px]' src={img3} alt="image3" />
                    </Slider>
                </div>
                <div className='md:w-1/4 w-full md:block flex items-center justify-between'>
                    <img className='md:w-full w-1/2 h-full md:h-[50%] object-cover lg:max-h-[300px]' src={img4} alt="image4" />
                    <img className='md:w-full w-1/2 h-full md:h-[50%] object-cover lg:max-h-[300px]' src={img5} alt="image5" />
                </div>
            </div>
        </div>
    )
}
