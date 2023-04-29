import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Products from './Products'

const Home = () => {

    const navigate = useNavigate()

    //Check if a user is logged in
    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])
    

    return (
        <div>
            <Products/>

        </div>
    )
}

export default Home