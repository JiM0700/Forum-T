import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './login.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Login(){

    const navigate = useNavigate()
    const [user,setUser] = useState({
        email_id:"",
        password:""
    })
    
    const handleChange = (e)=>{
        setUser((prev)=>({...prev,[e.target.name]:[e.target.value]}))
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3012/login",user)
            if(response.data.status === 200){
                navigate(`/user/home`)
                alert(`Welcome ${response.data.data[0].first_name}`)
            } else if(response.data.status === 500){
                alert("Check Your Login Credentials / SignUp")
            }
        } catch(error) {
            alert(error)
        }
    }


    return(
        <>
            <div className="mailLoginDiv">

                <div className="bg-black m-5 mailLoginBoxDiv">

                    <div className="p-5">
                        <div className="text-center">
                            <h2 className="loginheading text-light">Login</h2>
                        </div><br/>
                    <form action="">
                        <table className="m-auto">
                            <tr>
                                <div className="row p-3 logininputDiv">
                                    <div className="col-2"><FontAwesomeIcon icon="fa-solid fa-envelope" className="text-light" /></div>
                                    <div className="col-10"><input type="text" name="email_id" className="logininpBox" placeholder="Email Id" onChange={handleChange} required/></div>
                                </div>
                            </tr><br/>
                            <tr>
                            <div className="row p-3 logininputDiv">
                                <div className="col-2"><FontAwesomeIcon icon="fa-solid fa-key" className="text-light" /></div>
                                <div className="col-10"><input type="password" name="password" className="logininpBox" placeholder="Password" onChange={handleChange} required/></div>
                            </div>
                            </tr><br/>
                        </table>
                        <div className="text-center">
                            <button className="btn btn-primary loginbtn" onClick={handleLogin}>Login</button>
                        </div>
                    </form>
                    <div className="text-center p-3">
                        <label className="text-light">Forgot Password?</label>    
                    </div>            
                    <div className="text-center m-3">
                        <label className="text-light">Didn't have an Account? <Link to='/signup' className="signupLink">SignUp</Link></label>
                    </div>
                    <div className="text-center m-3">
                        <Link to='/admin/login' className="text-danger text-decoration-none">Admin Login</Link>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}