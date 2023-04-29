import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import Navbar from './Navbar'

const Products = () => {

    const navigate = useNavigate()
    
    const [productDescription,setProductDescription] = useState("")
    const [productPrice,setProductPrice] = useState("")
    const [category,setCategory] = useState("")
    const { productId } = useParams();
    const [available,setAvailable] = useState("")
    const [notAvailable,setNotAvailable] = useState("")
    
    //Check if a user is logged in
    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])

        useEffect ( () =>{
        let str = window.localStorage.getItem('token').replace(/["]/g,' ')
        
           fetch(` http://localhost:8080/eshop/products/${productId}`, {
            headers: {
                "Authorization": 'Bearer'+str,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"        
          }).then((res) => res.json())
          .then(page => {
            const {
                productDescription,
                productPrice,
                category,
                available
            } = page;
            setProductDescription(productDescription)
            setProductPrice(productPrice)
            setCategory(category)
            setAvailable(available)
            
            if(available=="Yes"){
                setNotAvailable("No")    
            }else{
                setNotAvailable("Yes")
            }

          })
    }, [])

    const editProd = async (e) =>{
        let str = window.localStorage.getItem('token').replace(/["]/g,' ');
        e.preventDefault();
        e.preventDefault();
        try {
          let res = await fetch(` http://localhost:8080/eshop/products/create-or-update?productId=${productId}`, {
            headers: {
                "Authorization": 'Bearer'+str,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                productDescription: productDescription,
                productPrice: productPrice,
                category: category,
                available:available
            }),
          });
            let resJson = await res.json();
            if (res.status === 200) {
                alert("Product Edited")
                navigate("/home")
            } else {
                alert("Error")
            }
            } catch (err) {
            console.log(err);
            }
    }

    const changeCategory = () =>{
        var UserOption  = document.getElementById('category').value;
        setCategory(UserOption)
    }

    const handleProductDescription = (event) =>{
        setProductDescription(event.target.value)
    }

    const handleProductPrice = (event) =>{
        setProductPrice(event.target.value)
    }

    const changeAvailable = (event) =>{
        setAvailable( event.target.value)
    }

    return (
        <div>
            <Navbar/>
            <div style={{paddingTop:"10%"}}>
                <form className='loginForm'>
                <h2>Edit Product</h2>
                    <label>Enter Product Description:
                        <input type="text" value={productDescription} onChange={handleProductDescription}/>
                    </label>
                    <label>Enter Product Price:
                        <input type="text" value={productPrice} onChange={handleProductPrice}/>
                    </label>

                    <label>Enter Product Availability:
                    <div className="row" style={{ width: '190px' }}>
                        <div>
                            <select name="availability" id="availability" onChange={changeAvailable}>
                                <option value={available}>{available}</option>
                                <option value={notAvailable}>{notAvailable}</option>
                            </select>
                        </div>
                    </div>
                </label>

                    <label>Enter Product Category:
                    <div className="row" style={{ width: '190px' }}>
                        <div >
                            <select name="category" id="category" onChange={changeCategory}>
                                <option >{category}</option>
                                <option value="smartphones">smartphones</option>
                                <option value="laptops">laptops</option>
                                <option value="tablets">tablets</option>
                                <option value="pc hardware">pc hardware</option>
                                <option value="monitors">monitors</option>
                                <option value="peripherals">peripherals</option>
                                <option value="cables">cables</option>
                                <option value="gaming">gaming</option>
                            </select>       
                            <button className='prod' onClick={editProd}>Edit Product</button>
                        </div>
                    </div>
                    </label>
                </form>
            </div>

        </div>
    )
}

export default Products