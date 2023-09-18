import React, { useEffect, useState } from "react";
import "./admin.css"
import AdminLogo from './Admin.png'
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Feedback() {

    const [allInfo, setAllInfo] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3012/admingetfeedback')
        .then(res=>setAllInfo(res.data))
    },[])

    const handleDelete = (id) =>{
        try {
            axios.delete('http://localhost:3012/deletefeedback/'+id)
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
                                <th>Feedback</th>
                                <th>Created At</th>
                                <th>Delete</th>

                            </tr>
                            {
                                allInfo.map((value, index) => (
                                    <>
                                        <tr className="border adminDetailsTable">
                                            <td>{value.id}</td>
                                            <td>{value.feedback}</td>
                                            <td>{value.created_time.toString().split("T")[0]}</td>
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