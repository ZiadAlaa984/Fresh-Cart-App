import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CardContext } from '../../Context/CardContext';

export default function ProductDetails() {
    const [isLoading, setisLoading] = useState(true)
    let { addToCard, setCountCard, addToWithList, WithlistCount, setWithlistCount } = useContext(CardContext)
    const { id } = useParams();
    let [details, setDetails] = useState(null);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    useEffect(() => {
        async function getDetails(id) {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            setDetails(data.data);
            setisLoading(false)
        }
        getDetails(id);
    }, [id,]);
    async function AddProductToCard(productId) {
        if (localStorage.getItem('Token')) {
            let { data } = await addToCard(productId);
            // console.log(data);
            if (data.status = 'success') {
                setCountCard(data.numOfCartItems)
                console.log('nice');
                toast.success('Product Add To Card');
                console.log(data.message);
            } else {
                console.log('problem ya bro ');
                toast(data.message)
            }
        }
        else {
            toast.error('Login First')
        }
    }
    async function addProductToWithList(productId) {
        if (localStorage.getItem('Token')) {
            let { data } = await addToWithList(productId);
            // console.log(data);
            if (data.status = 'success') {
                setWithlistCount(WithlistCount + 1)
                console.log('nice wihes');
                console.log(data.message);
                toast.success('Product Add To WithList');
            } else {
                console.log('problem ya bro wihes bad ');
                console.log(data.message);
            }
        }
        else {
            toast.error('Login First')
        }


    }
    if (isLoading) {
        return (
            <div className='flex justify-center min-h-screen items-center w-full'>
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <>
            {details && (
                <div className='flex-col w-full m-auto'>
                    <div className='flex gap-6 flex-col md:flex-row '>
                        <div className="md:w-1/3 mb-3">
                            <Slider {...settings}>
                                {details?.images.map((src, index) => <img src={src} key={index} className='w-full' alt={`Product image ${index + 1}`} />)}
                            </Slider>
                        </div>
                        <div className='w-full md:w-2/3'>
                            <div className="w-full flex gap-4 flex-col justify-center h-full">
                                <h1 className='md:text-4xl text-nowrap text-2xl  font-bold text-green-500 py-1 '> {details.title.split(" ").slice(0, 3).join(" ")}</h1>
                                <p className='md:text-xl text-md text-slate-800'>{details.description}</p>
                                <h5 className="block pb-1 text-[#14080e] font-bold text-xl md:text-2xl">
                                    {details.category.name}
                                </h5>
                                <h6 className="block  text-[#14080e] font-bold text-xl">
                                    {details.brand.name + " | "}
                                    <span className="text-green-400 ">Available</span>
                                </h6>
                                <div className="flex justify-between font-extralight text-[16px] items-center mt-1">
                                    <span className="font-medium ">{details.price} EGY</span>
                                    <span className="font-medium">
                                        {details.ratingsAverage}{" "}
                                        <i className="fa-solid text-yellow-300 fa-star"></i>
                                    </span>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <button
                                        onClick={() => addProductToWithList(details.id)}
                                        type="button"
                                        className="text-white bg-[#3bb77e] hover:bg-[#3bb77e] font-medium rounded-md text-xl md:text-2xl px-5 py-2.5 m-0 dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] dark:focus:ring-[#3bb77e]"

                                    >
                                        <i className="fa-regular fa-heart" />
                                    </button>
                                    <button
                                        onClick={() => AddProductToCard(details.id)}
                                        type="button"
                                        className="text-white gap-1 flex justify-center items-center capitalize text-xl md:text-2xl  flex-grow bg-[#3bb77e] hover:bg-[#3bb77e] font-medium rounded-md  px-5 py-2.5 m-0 dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] dark:focus:ring-[#3bb77e]"
                                    >
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 24 24"
                                            height="2rem"
                                            width="2rem"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="10.5" cy="19.5" r="1.5" />
                                            <circle cx="17.5" cy="19.5" r="1.5" />
                                            <path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z" />
                                            <path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z" />
                                        </svg> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </>
    );
}
