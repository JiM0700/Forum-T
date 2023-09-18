import React, { useState } from "react";
import './signup.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup() {

    const navigate = useNavigate()
    const [addUser,setAddUser] = useState({
        first_name:"",
        last_name:"",
        age:"",
        date_of_birth:"",
        gender:"",
        mobile_number:"",
        email_id:"",
        password:""
    })

    const handlechange = (e) => {
            setAddUser(prev=>({...prev,[e.target.name]:e.target.value}))
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:3012/signup", addUser)   
            alert('Welcome to Forum-T')         
            navigate('/')
        } catch(err) {
            alert(err);
        }
    }

    return (
        <>
            <div className="m-5">
                <div className="bg-black signupSecondDiv">
                    <div className="text-center p-3">
                        <h2 className="text-light">Registration</h2>
                    </div>
                    <div>
                        <form>
                            <table className="m-auto regTable">
                                <tr>
                                    <div className="d-flex m-1 signupDiv p-3">
                                        <div className="regFormLabel col-5"><label>First Name</label></div>
                                        <div className="regFormBox"> <input type="text" name="first_name" className="regInputs" onChange={handlechange} required /></div>
                                    </div>
                                </tr>
                                <tr>
                                    <div className="d-flex m-1 signupDiv p-3">
                                        <div className="regFormLabel col-5"><label>Last Name</label></div>
                                        <div className="regFormBox"> <input type="text" name="last_name" className="regInputs" onChange={handlechange} required /></div>
                                    </div>
                                </tr>
                                <tr>
                                    <div className="d-flex m-1 signupDiv p-3">
                                        <div className="regFormLabel col-5"><label>Age</label></div>
                                        <div className="regFormBox"> <input type="number" name="age" className="regInputs" onChange={handlechange} required /></div>
                                    </div>
                                </tr>
                                <tr>
                                    <div className="d-flex m-1 signupDiv p-3">
                                        <div className="regFormLabel col-5"><label>Date of Birth</label></div>
                                        <div className="regFormBox"><input type="text" name="date_of_birth" className="regInputs" onChange={handlechange} required /></div>
                                    </div>
                                </tr>
                                <tr>
                                    <div className="d-flex m-1 signupDiv p-3">
                                        <div className="regFormLabel col-5"><label>Gender</label></div>
                                        <div className="regFormBox"> <input type="text" name="gender" className="regInputs" onChange={handlechange} required /></div>
                                    </div>
                                </tr>
                                <tr>
                                    <div className="d-flex m-1 signupDiv p-3">
                                        <div className="regFormLabel col-5"><label>Mobile Number</label></div>
                                        <div className="regFormBox"> <input type="number" name="mobile_number" className="regInputs" onChange={handlechange} required /></div>
                                    </div>
                                </tr>
                                <tr>
                                    <div className="d-flex m-1 signupDiv p-3">
                                        <div className="regFormLabel col-5"><label>Email Id</label></div>
                                        <div className="regFormBox"> <input type="email" name="email_id" className="regInputs" onChange={handlechange} required /></div>
                                    </div>
                                </tr>
                                <tr>
                                    <div className="d-flex m-1 signupDiv p-3">
                                        <div className="regFormLabel col-5"><label>Password</label></div>
                                        <div className="regFormBox"> <input type="password" name="password" className="regInputs" onChange={handlechange} required /></div>
                                    </div>
                                </tr>
                            </table>
                            <div className="text-center m-2 p-4">
                                <button type="submit" id="submit" onClick={handlesubmit} className="btn btn-primary registerButton"> <Link to="/" className=""></Link> Register</button>
                            </div>
                        </form>
                    </div>
                    <div className="p-2">
                        <p className="text-light text-center">Already have an Account? <Link to="/" className="text-light loginLink">Login here</Link> </p>
                    </div>
                </div>
            </div>
        </>
    );
}