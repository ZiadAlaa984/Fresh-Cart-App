import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CardContext } from '../../Context/CardContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const { addToCard, setCountCard, addToWithList, WithlistCount, setWithlistCount } = useContext(CardContext);
    const [CurrentPage, setCurrentPage] = useState(1)
    const [state, setstate] = useState(true)
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        async function ProductsCurrentPage(CurrentPage) {
            console.log(CurrentPage);
            if (CurrentPage === 1) {
                return true
            }
            try {
                const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=12?nextPage=${CurrentPage}`);
                console.log(response.data.data);
                let nextProducts = response.data.data
                setProducts([...nextProducts])
                setstate(false)
                setisLoading(false)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        ProductsCurrentPage(CurrentPage)
    }, [CurrentPage])
    useEffect(() => {
        async function fetchData() {
            try {
                setisLoading(true)
                const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products?limit=12");
                setProducts(response.data.data);
                setisLoading(false)
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle error (e.g., show error message)
            }
        }
        fetchData();
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

    function filterByName(name) {
        const filterProducts = products.filter(product =>
            product.title.toLowerCase().includes(name.toLowerCase())
        );
        setProducts([...filterProducts]);

    }
    async function ProductspreviousPage() {
        try {
            setisLoading(true)
            const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products?limit=12");
            setProducts(response.data.data);
            let PreviousProducts = response.data.data
            setProducts([...PreviousProducts])
            setisLoading(false)
        } catch (error) {
            console.error('Error fetching products:', error);
            // Handle error (e.g., show error message)
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

            <div className='my-8 w-full'>
                <div className='p-3  rounded-xl border w-full shadow-md bg-white/75 backdrop-blur-lg transition-all'>
                    <form className="max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input onChange={(e) => filterByName(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search by name ..." required />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Search</button>
                        </div>
                    </form>

                </div>
                <div className="mt-4 flex flex-col items-center ">
                    <div className="row gap-4 justify-between">
                        {products.map((product, index) => (
                            <div key={product.id} className="col w-full sm:w-[45%] md:w-[30%] lg:w-[24%] border overflow-hidden rounded-xl bg-white">
                                <div className="inner border p-4">
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
                                            <span className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-[#14080e] hover:bg-green-500 duration-1000 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white">
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

                                    <div className="bodyImg">
                                        <p className="block text-green-500 py-1 font-normal text-[18px]">
                                            {product.title.split(" ").slice(0, 3).join(" ")}
                                        </p>
                                        <h5 className="block pb-1 text-[#14080e] font-bold text-[16px]">
                                            {product.category.name.split(" ").slice(0, 2).join(" ")}
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
                    </div>
                    <div className="flex mt-6 justify-center items-center w-full">
                        {state == true ? <button
                            onClick={() => setCurrentPage(CurrentPage + 1)}
                            type="button"
                            className="text-white text-md w-full transition-colors duration-300 bg-green-500 hover:bg-[#33a06d]  focus:outline-[#33a06d]  font-medium rounded-lg   sm:w-auto px-5 py-2.5 text-center dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] dark:focus:ring-[#3bb77e]"
                        >
                            Show More
                        </button> : <button
                            onClick={ProductspreviousPage}
                            type="button"
                            className="text-white text-md w-full transition-colors duration-300 bg-green-500 hover:bg-[#33a06d]  focus:outline-[#33a06d]  font-medium rounded-lg   sm:w-auto px-5 py-2.5 text-center dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] dark:focus:ring-[#3bb77e]"
                        >
                            Show Less
                        </button>}



                    </div>
                </div>
                <ToastContainer />
            </div>

        </>
    );
}
