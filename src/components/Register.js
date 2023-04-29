import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const role = "ROLE_USER"

    const navigate = useNavigate()

    const handleUsername = (event) =>{
        setUsername(event.target.value)
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value)
    }

    const handleRegister = async (e) =>{
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:8080/eshop/register", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                role: role,
            }),
          });
          //let resJson = await res.json();
          setUsername("")
          setPassword("")
          if (res.status === 200) {
            alert("User created")
            navigate('/login');
          } else {
            alert("Error")
          }
        } catch (err) {
          console.log(err);
        }
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', alignSelf: 'center' }}> Welcome to our E-Shop </h1>
            <div style={{paddingTop:"5%"}}>
                <form className='loginForm'>
                    <h1>Register</h1>
                    <label>Enter username:
                        <input type="text" value={username} onChange={handleUsername}/>
                    </label>
                    <label>Enter password:
                        <input type="password" value={password} onChange={handlePassword}/>
                    </label>
                    <button className="login" onClick={handleRegister}>Register</button>
                    <Link to="/login">Already a user?Sign in here</Link>
                </form>
            </div>
        </div>
    )
}

export default Register