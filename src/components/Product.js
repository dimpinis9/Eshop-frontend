import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import Navbar from './Navbar'

const Products = () => {

    const navigate = useNavigate()
    
    const [productDescription,setProductDescription] = useState("")
    const [productPrice,setProductPrice] = useState("")
    const [category,setCategory] = useState("")
    const { productId } = useParams();
    const [quantity,setQuantity] = useState(1)
    const [available,setAvailable] = useState(0)
    
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
          })
    }, [])

    const addToCart = async (e) =>{
        let str = window.localStorage.getItem('token').replace(/["]/g,' ')
        e.preventDefault();
        try {
          let res = await fetch(`http://localhost:8080/eshop/cart/add?productId=${productId}&quantity=${quantity}`, {
            headers: {
                "Authorization": 'Bearer'+str,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST"
          })
            let resJson = await res.json();
            if (res.status === 200) {
                alert("Added " + productDescription + " Quantity:" +quantity +" to Cart")
                navigate('/cart');
            } else {
                alert("Error")
            }
            } catch (err) {
            console.log(err);
            }
    }

    const changeQuantity = (event) =>{
        setQuantity(event.target.value)
    }

    return (
        <div>
            <Navbar/>
             <h1>Product</h1>

            <table class="table table-active table-striped">

                <thead class = "table-primary">

                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price €</th>
                        <th scope="col">Availability</th>
                        <th scope="col">Options</th>
                    </tr>

                </thead>

                <tbody>
                    {
                            <tr key={productId}>
                                <th scope="row">{productId}</th>
                                <td>{productDescription}</td>
                                <td>{category}</td>
                                <td>{productPrice}</td>
                                <td>{available}</td>
                                <td>
                                    <div className="row" style={{ width: '190px' }}>
                                        <div >
                                            <input onChange={changeQuantity} type="number" min="1" defaultValue="1" oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"></input>
                                            <button onClick={addToCart}>Add to Cart</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        
                    }

                </tbody>

                </table>

        </div>
    )
}

export default Products