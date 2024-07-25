import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardContext } from "../../Context/CardContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
    const [isLoading, setisLoading] = useState(true)
    const [Prodcuts, setProdcuts] = useState([]);
    let { addToCard, setCountCard, addToWithList, WithlistCount, setWithlistCount } = useContext(CardContext)
    useEffect(() => {
        async function getData() {
            await axios
                .get(`https://ecommerce.routemisr.com/api/v1/products?limit=12`)
                .then(({ data }) => {
                    setProdcuts(data.data);
                    setisLoading(false);
                });
        }
        getData();
    }, []);
    async function AddProductToCard(productId) {
        if (localStorage.getItem('Token')) {
            let { data } = await addToCard(productId);
            console.log(data);
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
            console.log(data);
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
        <div className="mt-2 w-full">
            <div className="row gap-4 w-full justify-between ">

                {Prodcuts.map((product, index) => (
                    <div className="col w-full  sm:w-[45%] md:w-[30%] lg:w-[24%]   border overflow-hidden rounded-xl bg-white">
                        <div className="inner border  p-4">
                            <div className="img relative h-1/2 md:h-full group">
                                <div className="layer -translate-y-1/2 flex justify-center items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2">
                                    <div onClick={() => addProductToWithList(product.id)} className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-[#14080e] hover:bg-green-500 duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white">
                                        <i className="fa-regular fa-heart" />
                                    </div>
                                    <div onClick={() => AddProductToCard(product.id)} className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-[#14080e] hover:bg-green-500 duration-700 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 24 24"
                                            height="1.5rem"
                                            width="1.5rem"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="10.5" cy="19.5" r="1.5" />
                                            <circle cx="17.5" cy="19.5" r="1.5" />
                                            <path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z" />
                                            <path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z" />
                                        </svg>
                                    </div>
                                    <span
                                        className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-[#14080e] hover:bg-green-500 duration-1000 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"

                                    >
                                        <Link to={`/productDetails/${product.id}`} >
                                            <i className="fa-solid fa-eye" />
                                        </Link>
                                    </span>
                                </div>
                                <img
                                    src={product.imageCover}
                                    className="w-full"
                                    alt={`${product.title} cover`}
                                />
                            </div>

                            <div className="bodyImg ">
                                <p className="block text-green-500 py-1 font-normal text-[18px]">
                                    {product.title.split(" ").slice(0, 3).join(" ")}
                                </p>
                                <h5 className="block pb-1 text-[#14080e] font-bold text-[16px]">
                                    {product.category.name.split(" ").slice(0, 2).join(" ")}
                                </h5>
                                <h6 className="block  text-[#14080e] font-bold text-[14px]">
                                    {product.brand.name + " | "}
                                    <span className="text-green-400 ">Available</span>
                                </h6>
                                <div className="flex justify-between font-extralight text-[16px] items-center mt-1">
                                    <span className="font-medium ">{product.price} EGY</span>
                                    <span className="font-medium">
                                        {product.ratingsAverage}{" "}
                                        <i className="fa-solid text-yellow-300 fa-star"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <ToastContainer />
        </div>
    );
}
