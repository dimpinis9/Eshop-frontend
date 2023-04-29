import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'
import React,{ useEffect,useState } from 'react';

function MyOrders() {
    const navigate = useNavigate()

    useEffect( () =>{

      if(!window.localStorage.getItem('token')){
          navigate("/login")
      }
        
      },[])

      const [orders,setOrders] = useState([])
      const [error, setError] = React.useState(null)
      const [status, setStatus] = React.useState('')

      useEffect ( () =>{
      let str = window.localStorage.getItem('token').replace(/["]/g,' ');
     
         fetch(` http://localhost:8080/eshop/orders/user?` +(status ? `status=${status}` : ''), {
          headers: {
              "Authorization": 'Bearer'+str,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          method: "GET"        
        }).then((res) => res.json())
        .then(page => {
          const {
            orders
          } = page;
          setOrders(page);
        })
        .catch(err => setError(err))
        
          
  }, [orders,status])


  return (
    <>
      <Navbar/>
      
      <br></br>

        <div className="row">
            <h1>My Orders</h1>
            <div className="filter3">
                    <select defaultValue={status} onChange={(e) => { setStatus(e.target.value) }} className="form-select" aria-label="Default select example">
                        <option value="">Category: All</option>
                        <option value="submitted">Category: submitted</option>
                        <option value="completed">Category: completed</option>
                    </select>
            </div>

        </div>

        <br></br>

      <table class="table table-active table-striped">

                <thead class = "table-primary">

                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Address</th>
                        <th scope="col">Total Cost €</th>
                        <th scope="col">Status</th>
                        <th scope="col">View More</th>
                    </tr>

                </thead>

                <tbody>
                    {
                        orders.map(order => (
                            <tr key={order.ordersId}>
                                <th scope="row">{order.ordersId}</th>
                                <td>{order.address}</td>
                                <td>{order.totalCost}</td>
                                <td>{order.status}</td>
                                <td >
                                    <div className="row" >
                                        <div className="col">
                                        <a href={`/orders/products/${order.ordersId}`} className="btn btn-dark">View</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>

    </>
  );
}

export default MyOrders;