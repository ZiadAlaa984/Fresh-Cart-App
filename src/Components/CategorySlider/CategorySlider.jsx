import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import style from './CategorySlider.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
    const [isLoading, setisLoading] = useState(true)

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        dots: false,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };

    const [Category, setCategory] = useState([]);

    async function getCategory() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            setCategory(response.data.data);
            setisLoading(false)
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);
    if (isLoading) {
        return (
            <div className='flex justify-center min-h-screen items-center w-full'>
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <div className='mb-6'>
            <h1 className='lg:text-3xl text-xl md:text-2xl  opacity-80 my-8'>Shop now by popular categories</h1>
            <Slider {...settings}>
                {Category.map((category) => (
                    <div
                        className='flex flex-col mb-6 md:mb-0 border border-gray-200 bg-white/75 backdrop-blur-lg  '
                        key={category._id}
                        tabIndex="0"
                    >
                        <img src={category.image} className='w-full h-[300px] object-cover' alt={category.name} />
                        <h5 className='text-md font-bold text-nowrap text-center opacity-70 p-4'>{category.name}</h5>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
