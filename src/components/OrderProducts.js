import React, { useEffect,useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import Navbar from './Navbar'

const Products = () => {

    const navigate = useNavigate()

    const [error, setError] = React.useState(null)
    const [products, setProducts] = React.useState([])
    const { ordersId } = useParams();
    
    //Check if a user is logged in
    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])
        useEffect ( () =>{
            let str = window.localStorage.getItem('token').replace(/["]/g,' ')
            
               fetch(` http://localhost:8080/eshop/orders/products/${ordersId}`, {
                headers: {
                    "Authorization": 'Bearer'+str,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"        
              }).then((res) => res.json())
              .then(page => {
                const {
                    products
                } = page;
                setProducts(page)
              })
        }, [])

        const complete = async (e) =>{
            let str = window.localStorage.getItem('token').replace(/["]/g,' ');
            try {
              let res = await fetch(`http://localhost:8080/eshop/orders/validate?ordersId=${ordersId}`, {
                headers: {
                    "Authorization": 'Bearer'+str,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST"
              });
                let resJson = await res.json();
                if (res.status === 200) {
                    alert("Ordered Completed")
                } else {
                    alert("Error")
                }
                } catch (err) {
                console.log(err);
                }
        }

        const validateOrder = (e) => {
            if(window.localStorage.getItem('role')==1){
                return <button onClick={() => complete()} className="filter3">Complete Order</button>
            }
    
        }

    return (
        <div>
            <Navbar/>

            <br></br>

            <div class="row">
                <h1>Order {ordersId} Products</h1>
                {validateOrder()}
            </div>

            <br></br>

            <table className="table table-active table-striped">

                <thead class = "table-primary">

                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price €</th>
                        <th scope="col">Quantity</th>
                    </tr>

                </thead>


                <tbody>
                    {
                        products.map(product => (
                            <tr key={product.productId} >
                                <th scope="row">{product.productId}</th>
                                <td>{product.productDescription}</td>
                                <td>{product.category}</td>
                                <td>{product.productPrice}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>
            

        </div>
    )
}

export default Products