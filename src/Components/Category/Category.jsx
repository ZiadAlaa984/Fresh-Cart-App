import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [outOfStock, setOutOfStock] = useState([
        'Electronics', "Women's Fashion", "Men's Fashion"
    ]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
                setCategories(response.data.data);
                // console.log(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        getData();
    }, []);

    return (
        <div className="row my-8">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className="inner cursor-pointer m-0 hover:scale-105 duration-300 transition-all flex-col md:w-1/2 lg:w-1/4 w-full flex p-5"
                >
                    <Link to={`/CategoryDetails/${category._id}`} className="block">
                        <div className="shadow-md relative">
                            {outOfStock.includes(category.name) ? null : (
                                <p className="bg-red-600 p-2 bg-opacity-50 text-md w-full text-white uppercase text-center absolute top-1/2 -translate-y-1/2">
                                    Out OF STOCK
                                </p>
                            )}
                            <img
                                src={category.image}
                                className="w-full h-[400px] object-cover"
                                alt={`${category.name} cover`}
                            />
                            <div className="mx-auto w-full border-gray-200 bg-white/75 backdrop-blur-lg">
                                <h2 className="text-2xl font-bold text-nowrap text-center opacity-70 p-4">
                                    {category.name}
                                </h2>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
