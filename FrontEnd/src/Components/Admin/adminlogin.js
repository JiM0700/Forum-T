import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function AdminLogin(){

    const navigate = useNavigate()
    const [admin,setAdmin] = useState({
        email_id:"",
        password:""
    })
    
    const handleChange = (e)=>{
        setAdmin((prev)=>({...prev,[e.target.name]:[e.target.value]}))
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3012/adminlogin",admin)
            if(response.data.data.length === 1){
                alert(`Welcome Admin, ${response.data.data[0].first_name}`)
                navigate("/admin")
            } else {
                alert("You are Not an Admin, Try to Login as User")
                navigate('/')
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
                            <h2 className="loginheading text-light">Admin Login</h2>
                        </div><br/>
                    <form action="">
                        <table className="m-auto">
                            <tr>
                                <div className="row p-3 logininputDiv">
                                    <div className="col-2"><FontAwesomeIcon icon="fa-solid fa-envelope" className="text-light" /></div>
                                    <div className="col-10"><input type="text" name="email_id" className="logininpBox" placeholder="Admin Email Id" onChange={handleChange} required/></div>
                                </div>
                            </tr><br/>
                            <tr>
                            <div className="row p-3 logininputDiv">
                                <div className="col-2"><FontAwesomeIcon icon="fa-solid fa-key" className="text-light" /></div>
                                <div className="col-10"><input type="password" name="password" className="logininpBox" placeholder="Admin Password" onChange={handleChange} required/></div>
                            </div>
                            </tr><br/>
                        </table>
                        <div className="text-center">
                            <button className="btn btn-primary loginbtn" onClick={handleLogin}>Login</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}