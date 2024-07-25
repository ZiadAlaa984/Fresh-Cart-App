import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../../assets/images1 (11).svg';
import { CardContext } from '../../Context/CardContext';

export default function Heart() {
    const [isLoading, setisLoading] = useState(true)

    let { removeWithList, getWithList, setCountCard, addToCard } = useContext(CardContext);
    const [productWithList, setproductWithList] = useState([]);
    useEffect(() => {
        async function getDataWithList() {
            try {
                let { data } = await getWithList();
                setproductWithList(data.data);
                setisLoading(false)
            } catch (error) {
                console.error("Error fetching wishlist details:", error);
                toast.error("Failed to fetch wishlist details");
            }
        }
        getDataWithList();
    }, [getWithList]);
    async function RemoveDataWithList(productId) {
        try {
            setisLoading(true)
            let { data } = await removeWithList(productId);
            if (data.status === 'success') {
                setisLoading(false)
                const updatedProductWithList = productWithList.filter(product => product.id !== productId);
                setproductWithList([...updatedProductWithList]);
                console.log('nice ya bro ');
                toast.success(' Remove item from wishlist');
            } else {
                console.log('problem ya bro');
            }
        } catch (error) {
            console.error("Error removing item from wishlist:", error);
            toast.error("Failed to remove item from wishlist");
        }
    }


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
    if (isLoading) {
        return (
            <div className='flex justify-center min-h-screen items-center w-full'>
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <div className="mt-2 w-full">
            {productWithList.length > 0 ? <div className="row gap-4 w-full   ">
                {productWithList.map((product) => (
                    <div key={product.id} className="col w-full sm:w-[45%] md:w-[30%] lg:w-[24%] border overflow-hidden rounded-xl bg-white">
                        <div className="inner border p-4">
                            <div className="img relative h-1/2 md:h-full group">
                                <div className="layer -translate-y-1/2 flex justify-center items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2">
                                    <div onClick={() => RemoveDataWithList(product.id)} className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-[#14080e] hover:bg-green-500 duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white">
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
                                        <Link to={`/productDetails/${product.id}`}>
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
                                <h5 className="pb-1 justify-between flex items-center text-[#14080e] font-bold text-[16px]">
                                    {product.category.name.split(" ").slice(0, 2).join(" ")}
                                    <span><i className="fa-solid text-red-700 text-md fa-heart"></i></span>
                                </h5>
                                <h6 className="block text-[#14080e] font-bold text-[14px]">
                                    {product.brand.name + " | "}
                                    <span className="text-green-400">Available</span>
                                </h6>
                                <div className="flex justify-between font-extralight text-[16px] items-center mt-1">
                                    <span className="font-medium">{product.price} EGY</span>
                                    <span className="font-medium">
                                        {product.ratingsAverage}{" "}
                                        <i className="fa-solid text-yellow-300 fa-star"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div> : <div className='flex justify-center items-center'>
                <img src={img} className='w-1/2' />
            </div>}

            <ToastContainer />
        </div>
    );
}
