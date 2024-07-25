import axios from "axios";
import { createContext, useState, useEffect } from "react";
export const CardContext = createContext();

export default function CardContextProvider(props) {
    const [CountCard, setCountCard] = useState(0)
    const [WithlistCount, setWithlistCount] = useState(0)
    const headers = {
        token: localStorage.getItem('Token')
    };
    //^  card
    ////////////////////////////////////////////////////////////
    useEffect(() => {
        async function getCard() {
            try {
                let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
                setCountCard(data.numOfCartItems);
            } catch (err) {
                console.error("Error fetching cart items:", err);
            }
        }
        getCard();
        async function getWith() {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers
            })
            setWithlistCount(data.count);
            console.log(data.count);
        }
        getWith()
    }, []);
    function addToCard(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        }, {
            headers
        })
            .then((response) => response)
            .catch((err) => err);
    }
    function UpdateCard(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count
        }, {
            headers
        })
            .then((response) => response)
            .catch((err) => err);
    }
    function removeCard(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err);
    }
    function getCard() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err);
    }
    ////////////////////////////////////////////////////////////
    //^  withList
    function addToWithList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId
        }, {
            headers
        })
            .then((response) => response)
            .catch((err) => err);
    }
    function getWithList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err);
    }
    function removeWithList(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err);
    }
    return (
        <CardContext.Provider value={{ addToCard, removeWithList, getWithList, getCard, addToWithList, UpdateCard, removeCard, CountCard, setCountCard, WithlistCount, setWithlistCount }}>
            {props.children}
        </CardContext.Provider>
    )
}
