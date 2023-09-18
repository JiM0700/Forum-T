import React, { useEffect, useState } from "react";
import "./admin.css"
import AdminLogo from './Admin.png'
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Admin() {

    //Get All User Information
    const [allInfo, setAllInfo] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3012/admingetall')
        .then(res=>setAllInfo(res.data))
    },[])

    //Promote an User as Admin
    const handleMakeAdmin = (id) =>{
        try {
            axios.put('http://localhost:3012/makeadmin/'+id)
                .then(alert("Admin Added"))
                .then(window.location.reload())
        } catch (error) {
            console.log(error)
        }
    }

    //Demote an User from Admin
    const handleRemoveAdmin = (id) =>{
        try {
            axios.put('http://localhost:3012/removeadmin/'+id)
                .then(alert("Admin Removed"))
                .then(window.location.reload())
        } catch (error) {
            console.log(error)
        }
    }

    //Delete an User Permanently
    const handleReactive = (id) =>{
        try {
            axios.put('http://localhost:3012/reactive/'+id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    //Delete an User Permanently
    const handleSoftDelete = (id) =>{
        try {
            axios.put('http://localhost:3012/softdelete/'+id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    //Delete an User Permanently
    const handleDelete = (id) =>{
        try {
            axios.delete('http://localhost:3012/deleteuser/'+id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="adminMainDiv">
                <div className="d-flex">
                    <div className="col-2 bg-secondary adminLeftNav p-3  text-center">
                        <div className="adminlogo">
                            <img src={AdminLogo} height="100px" alt="admin_logo" />
                        </div>
                        <div className="p-2">
                            <p className="text-light adminLeftNavText"><Link className="adminLink text-light">Dashboard</Link></p>
                        </div>
                        <div className="p-2">
                            <p className="text-light adminLeftNavText"><Link to="/admin" className="adminLink text-light">User</Link></p>
                        </div>
                        <div className="p-2">
                            <p className="text-light adminLeftNavText"><Link to="/admin/post" className="adminLink text-light">Post</Link></p>
                        </div>
                        <div className="p-2">
                            <p className="text-light adminLeftNavText"><Link to="/admin/feedback" className="adminLink text-light">Feedback</Link></p>
                        </div>
                        <div className="p-2">
                            <p className="text-light adminLeftNavText"><Link to="/" className="adminLink text-light">Log Out</Link></p>
                        </div>
                    </div>
                    <div className="col-10 p-3 adminRightNav">
                        <table className="border table">
                            <tr className="columnList">
                                <th>Id</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Age</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>MobileNumber</th>
                                <th>EmailId</th>
                                <th>Password</th>
                                <th>Created At</th>
                                <th>is Active</th>
                                <th>is Admin</th>
                                <th>Make Active</th>
                                <th>Make Inactive</th>
                                <th>Make Admin</th>
                                <th>Remove Admin</th>
                                <th>Delete</th>

                            </tr>
                            {
                                allInfo.map((value, index) => (
                                    <>
                                        <tr className="border adminDetailsTable">
                                            <td>{value.id}</td>
                                            <td>{value.first_name}</td>
                                            <td>{value.last_name}</td>
                                            <td>{value.age}</td>
                                            <td>{value.date_of_birth}</td>
                                            <td>{value.gender}</td>
                                            <td>{value.mobile_number}</td>
                                            <td>{value.email_id}</td>
                                            <td>{value.password}</td>
                                            <td>{value.created_time.toString().split("T")[0]}</td>
                                            <td>{value.is_active}</td>
                                            <td>{value.is_admin}</td>
                                            <td>
                                                <FontAwesomeIcon  className="managebutton text-success" icon="fa-solid fa-pen-to-square" onClick={()=>handleReactive(value.id)} />
                                            </td>
                                            <td>
                                                <FontAwesomeIcon  className="managebutton text-warning" icon="fa-solid fa-pen-to-square" onClick={()=>handleSoftDelete(value.id)} />
                                            </td>
                                            <td>
                                                <FontAwesomeIcon  className="managebutton text-success" icon="fa-solid fa-pen-to-square" onClick={()=>handleMakeAdmin(value.id)} />
                                            </td>
                                            <td>
                                                <FontAwesomeIcon  className="managebutton text-warning" icon="fa-solid fa-pen-to-square" onClick={()=>handleRemoveAdmin(value.id)}/>
                                            </td>
                                            <td>
                                                <FontAwesomeIcon className="deleteButton" icon="fa-solid fa-trash" style={{color: "#ff0000",}} onClick={()=>handleDelete(value.id)} />
                                            </td>
                                        </tr>
                                    </>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
}