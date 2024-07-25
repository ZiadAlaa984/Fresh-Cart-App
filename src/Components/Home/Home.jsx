import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './Home.module.css'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'
import { UserContext } from '../../Context/UserContext'

export default function Home() {

    return (
        <>
            <div className='flex container my-8 flex-col w-full '>
                <MainSlider />
                <CategorySlider />
                <Products />
            </div>
        </>
    )
}
