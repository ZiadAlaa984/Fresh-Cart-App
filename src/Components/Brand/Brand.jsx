
import { useEffect } from 'react'
import { useState } from 'react'
import React from 'react';
import axios from 'axios';


export default function Brand() {
    const [Brands, setBrands] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
                setBrands(response.data.data);
                // console.log(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        getData();
    }, []);


    return (
        <div className="row my-8">
            {Brands.map((Brand, index) => (
                <div
                    key={index}
                    className="inner cursor-pointer m-0 hover:scale-105 duration-300 transition-all flex-col md:w-1/2 lg:w-1/4 w-full flex p-5"
                >
                    <div className="shadow-md relative">
                        <img
                            src={Brand.image}
                            className="w-full object-contain"
                            alt={`${Brand.name} cover`}
                        />
                        <div className="mx-auto w-full border-gray-200 bg-white/75 backdrop-blur-lg">
                            <h2 className="text-2xl font-bold text-nowrap text-center opacity-70 p-4">
                                {Brand.name}
                            </h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
