import { useEffect, useState, useContext } from 'react';
import { CardContext } from '../../Context/CardContext';
import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images1 (10).svg';

export default function Card() {
    const [isLoading, setisLoading] = useState(true)
    const [ProductCard, setProductCard] = useState([]);
    const [CardDetails, setCardDetails] = useState([]);
    let { getCard, CountCard, UpdateCard, removeCard, setCountCard } = useContext(CardContext);
    useEffect(() => {
        async function getDataCard() {
            try {
                let { data } = await getCard();
                setCountCard(data.numOfCartItems);
                setCardDetails(data.data)
                setProductCard(data.data.products)
                setisLoading(false)
            } catch (error) {
                console.error("Error fetching card details:", error);
            }
        }
        getDataCard();
    }, []);
    async function RemoveDataCard(productId) {
        try {
            let { data } = await removeCard(productId);
            // ^  count , productCard , total 
            setCardDetails(data.data)
            setCountCard(data.numOfCartItems);
            setProductCard(data.data.products)
        } catch (error) {
            console.error("Error fetching card details:", error);
        }
    }
    async function UpdateDataCard(productId, count) {
        if (count < 1) {
            return RemoveDataCard(productId);
        }
        try {
            let { data } = await UpdateCard(productId, count);
            // ^  count , productCard , total 
            console.log(data);
            setCardDetails(data.data)
            setProductCard(data.data.products)
        } catch (error) {
            console.error("Error fetching card details:", error);
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
            {ProductCard.length > 0 ? <div className='flex flex-col my-8  container mx-auto items-start gap-9'>
                <div className='flex flex-col md:flex-row w-full justify-between items-center'>
                    <p className=' capitalize text-xl font-bold text-[#14080e] '>
                        Number of cart items: <span className='text-green-600'>{CountCard}</span>
                    </p>
                    <p className=' capitalize text-xl font-bold text-[#14080e] '>
                        Total price: <span className='text-green-600'>{CardDetails.totalCartPrice} EGP</span>
                    </p>
                </div>

                <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="text-center text-[18px] text-[#14080e] p-4 " >
                                    Image
                                </th>
                                <th scope="col" className="text-center text-[18px] text-[#14080e] p-4 " >
                                    Product
                                </th>
                                <th scope="col" className="text-center text-[18px] text-[#14080e] p-4 " >
                                    Qty
                                </th>
                                <th scope="col" className="text-center text-[18px] text-[#14080e] p-4 " >
                                    Price
                                </th>
                                <th scope="col" className="text-center text-[18px] text-[#14080e] p-4 " >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProductCard.map((product) => (
                                <tr key={product.product.id} id={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4 flex justify-center items-center">
                                        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                                    </td>
                                    <td className="text-center p-3 font-semibold text-xl text-[#14080e] dark:text-white">
                                        {product.product.title.split(' ').slice(0, 3).join(' ')}
                                    </td>
                                    <td className="text-center p-3">
                                        <div className="flex items-center justify-center">
                                            <button onClick={() => UpdateDataCard(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                <span className="sr-only">Decrease quantity</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <div>
                                                <span>{product.count}</span>
                                            </div>
                                            <button onClick={() => UpdateDataCard(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                <span className="sr-only">Increase quantity</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-center font-medium p-3  text-[16px] text-[#14080e] dark:text-white">
                                        {product.price} EGP
                                    </td>
                                    <td className="text-center p-3">
                                        <button onClick={() => RemoveDataCard(product.product.id)} type="button" className="text-red-700 transition-all duration-300 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='flex justify-end items-center'>
                    <Link to='/Checkout' type="button" className="focus:outline-none text-white bg-[#3bb77e]  font-medium rounded-lg  px-12  dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] text-nowrap text-md py-3 dark:focus:ring-green-800">Online Payment</Link>
                </div>

            </div> : <div className='flex justify-center my-8 items-center'>
                <img src={img} className='w-1/2' />
            </div>}
        </>
    )
}
