import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Popup from 'reactjs-popup';


const ProductCreateOrUpdate = () => {

    const navigate = useNavigate()
    
    const [productDescription,setProductDescription] = useState("")
    const [productPrice,setProductPrice] = useState("")
    const [category,setCategory] = useState("")
    const [available,setAvailable] = useState("")
    

    const handleProductDescription = (event) =>{
        setProductDescription(event.target.value)
    }

    const handleProductPrice = (event) =>{
        setProductPrice(event.target.value)
    }

    //Check if a user is logged in
    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])

        const createProd = async (e) =>{
            let str = window.localStorage.getItem('token').replace(/["]/g,' ');
            e.preventDefault();
            e.preventDefault();
            try {
              let res = await fetch(" http://localhost:8080/eshop/products/create-or-update", {
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
                
                setProductDescription("")
                setProductPrice("")
                setCategory(document.getElementById('category').value)
                setAvailable(document.getElementById('availability').value)
                if (res.status === 200) {
                    alert("Product Created")
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

        const changeAvailable = (event) =>{
            setAvailable( event.target.value)
        }

    return (
        <div>
            <Navbar/>
            
            <div style={{paddingTop:"10%"}}>
            <form className='loginForm'>
            <h2>Create Product</h2>
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
                                <option >Select</option>
                                <option value="yes">yes</option>
                                <option value="no">no</option>
                            </select>
                        </div>
                    </div>
                </label>

                <label>Enter Product Category:
                <div className="row" style={{ width: '190px' }}>
                    <div >
                        <select name="category" id="category" onChange={changeCategory}>
                            <option >Select</option>
                            <option value="smartphones">smartphones</option>
                            <option value="laptops">laptops</option>
                            <option value="tablets">tablets</option>
                            <option value="pc hardware">pc hardware</option>
                            <option value="monitors">monitors</option>
                            <option value="peripherals">peripherals</option>
                            <option value="cables">cables</option>
                            <option value="gaming">gaming</option>
                        </select>       
                        <button className='prod' onClick={createProd}>Create Product</button>
                    </div>
                </div>
                </label>
            </form>
            </div>
        </div>
    )
}

export default ProductCreateOrUpdate