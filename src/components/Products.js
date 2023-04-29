import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Navbar from './Navbar'

const Products = () => {

    const navigate = useNavigate()

    const [error, setError] = React.useState(null)
    const [products, setProducts] = React.useState([])

    const [productDescription, setProductDescription] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [page, setPage] = React.useState(0)
    const [size, setSize] = React.useState(3)
    const [sort, setSort] = React.useState("ASC")

    const [totalPages, setTotalPages] = React.useState(0)
    const [number, setNumber] = React.useState(0)
    const [totalElements, setTotalElements] = React.useState(0)
    const [refresh, setRefresh] = React.useState(0)
    
    //Check if a user is logged in
    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])
           
       

        useEffect ( () =>{
        let str = window.localStorage.getItem('token').replace(/["]/g,' ');
       
           fetch(` http://localhost:8080/eshop/products/all?page=${page}&size=${size}&sort=${sort}` + (productDescription ? `&productDescription=${productDescription}` : '') + (category ? `&category=${category}` : ''), {
            headers: {
                "Authorization": 'Bearer'+str,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"        
          }).then((res) => res.json())
          .then(page => {
            const {
              content,
              number,
              totalElements,
              totalPages
            } = page;
            setNumber(number)
            setTotalPages(totalPages)
            setProducts(content)
            setTotalElements(totalElements)
          })
          .catch(err => setError(err))
            
    }, [productDescription, category,page, size, sort, refresh])

    const delProd = async(e) =>{
        let str = window.localStorage.getItem('token').replace(/["]/g,' ')
        try {
            let res = await fetch(` http://localhost:8080/eshop/products/delete/`+e, {
              headers: {
                  "Authorization": 'Bearer'+str,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              method: "DELETE"
            });
              let resJson = await res.json();
              if (res.status === 200) {
                    alert("Product Deleted")
                    setRefresh(1)
                    navigate('/home');
              } else {
                  alert("Error")
              }
              } catch (err) {
              console.log(err);
              }
    }

    const editProduct = (e) => {
        if(window.localStorage.getItem('role')==1){
            return <a href={`/product/edit/${e}`} className="btn btn-dark">Edit</a>
        }

    }

    const delProduct = (e) => {
        if(window.localStorage.getItem('role')==1){
            return <a className="btn btn-dark" onClick={() => delProd(e)}>Delete</a>
        }

    }

    return (
        <div>
            <Navbar/>

            
            <br></br>

            <div class="row">
                <h1>Products</h1>

                <div  className="login">
                    <input value={productDescription} onChange={(e) => setProductDescription(e.target.value)} name="productDescription" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                </div>
                <div className="filter3">
                    <select defaultValue={sort} onChange={(e) => { setSort(e.target.value) }} className="form-select" aria-label="Default select example">
                        <option value="ASC">Sort by Price: Asc</option>
                        <option value="DESC">Sort by Price: Desc</option>
                    </select>
                </div>
                <div className="filter">
                    <select defaultValue={category} onChange={(e) => { setCategory(e.target.value) }} className="form-select" aria-label="Default select example">
                                <option value="">Category: All</option>
                                <option value="smartphones">Category: smartphones</option>
                                <option value="laptops">Category: laptops</option>
                                <option value="tablets">Category: tablets</option>
                                <option value="pc hardware">Category: pc hardware</option>
                                <option value="monitors">Category: monitors</option>
                                <option value="peripherals">Category: peripherals</option>
                                <option value="cables">Category: cables</option>
                                <option value="gaming">Category: gaming</option>
                    </select>
                </div>
            </div>
            <br></br>
            <table className="table table-active table-striped">

                <thead class = "table-primary">

                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price €</th>
                        <th scope="col">Available</th>
                        <th scope="col">Options</th>
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
                                <td>{product.available}</td>
                                <td >
                                    <div className="row" >
                                        <div className="col">
                                        <a href={`/product/${product.productId}`} className="btn btn-dark">View</a>
                                        {editProduct(product.productId)}
                                        {delProduct(product.productId)}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>
            
            {
                totalPages > 0 ? (
                    <div className="row justify-content-between">
                        <div className='filter2'>
                            <Form.Select defaultValue={size} onChange={(e) => setSize(e.target.value)}>
                                <option value={3}>Page size: 3</option>
                                <option value={10}>Page size: 10</option>
                                <option value={20}>Page size: 20</option>
                            </Form.Select>
                        </div>
                    <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                        <span>{'Now on ' + (number + 1) + ' from total ' + totalPages + ' pages'}</span>
                        <span>{'(Total ' + totalElements + ' products)'}</span>
                    </div>
                        <div className="col-3 d-flex justify-content-end">
                            <nav>
                                <ul className="pagination">

                                    <li className={number === 0 ? 'disabled page-item' : 'page-item'}>
                                        <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number - 1) }}>Previous</a>
                                    </li>

                                    {
                                        number > 0 ? (
                                            <li className="page-item">
                                                <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number - 1) }}>{number}</a>
                                            </li>
                                        ) : null
                                    }


                                    <li className="page-item active">
                                        <a className="page-link" href="#">{number + 1}</a>
                                    </li>

                                    {
                                        number < totalPages - 1 ? (
                                            <li className="page-item">
                                                <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number + 1) }}>{number + 2}</a>
                                            </li>
                                        ) : null
                                    }

                                    <li className={number === totalPages - 1 ? 'disabled page-item' : 'page-item'}>
                                        <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number + 1) }}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col text-center"><span>No Data</span></div>
                    </div>
                )
        }

        </div>
    )
}

export default Products