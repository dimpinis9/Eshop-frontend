import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    let token;
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()

    const handleUsername = (event) =>{
        setUsername(event.target.value)
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value)
    }

    const handleLogin = async (e) =>{
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:8080/eshop/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
          });
            let resJson = await res.json();
            token = resJson
            window.localStorage.setItem("token",JSON.stringify(token.token))
            setUsername("")
            setPassword("")
            if (res.status === 200) {
                getRole()
                navigate('/home');
            } else {
                alert("Error")
            }
            } catch (err) {
            console.log(err);
            }
    }

    const getRole = async(e)=>{
      
            let str = window.localStorage.getItem('token').replace(/["]/g,' ');
           
               fetch(`http://localhost:8080/eshop/role`, {
                headers: {
                    "Authorization": 'Bearer'+str
                },
                method: "GET"        
              }).then(response => response.text())
              .then((response) => {
                if(response === "ROLE_ADMIN"){
                    window.localStorage.setItem("role",1)
                  }
               })
           
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', alignSelf: 'center' }}> Welcome to our E-Shop </h1>

            <div style={{paddingTop:"5%"}}>
                <form className='loginForm'>
                <h1>Login</h1>
                    <label>Enter username:
                        <input type="text" value={username} onChange={handleUsername}/>
                    </label>
                    <label>Enter password:
                        <input type="password" value={password} onChange={handlePassword}/>
                    </label>
                    <button className="login" onClick={handleLogin}>Login</button>
                
                <Link to="/">Do not have an account? <br/> Sign up here</Link>
               
                </form>
            </div>
        </div>
    )
}

export default Login