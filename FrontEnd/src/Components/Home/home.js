import React, { useEffect, useState } from "react";
import './home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";

export function UserHome() { 

    //Fetching All User Post
    const [viewposts, setviewPosts] = useState([])
    useEffect(() => {
        const fetchAllPost = async() =>{
            try{
                const res = await axios.get("http://localhost:3012/getpost")
                setviewPosts(res.data)
                console.log(res);
            } catch(error){
                console.log(error);
            }
        }
        fetchAllPost()
    }, [])
    
    //Generating Time For HomePage
    const [date,setDate] = useState(new Date())
    useEffect(()=>{
        const intervalID = setInterval(()=>{
            setDate(new Date())
        },1000)

        return () => clearInterval(intervalID)
    },[])

    //Creating Post
    const [addPost,setAddPost] = useState({
        post:""
    })
    const handlechange = (e) =>{
        setAddPost(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handlesubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:3012/newpost", addPost)            
            window.location.reload();
        } catch(err) {
            alert(err);
        }
    }

    //Fetching All Feedback
    const [Feedback,getFeedback] = useState([])

    useEffect(()=>{
        const fetchAllReply = async()=>{
            try {
                const res = await axios.get('http://localhost:3012/getfeedback/')
                getFeedback(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllReply()
    },[])

    //Posting Feedback
    const [sendFeedback,setSendFeedback] = useState({
        feedback:""
    })
    const handleFeedback = (e) =>{
        setSendFeedback(prev =>({...prev,[e.target.name]:[e.target.value]}))
    }
    const handleFeedbackSubmit = async(e)=>{
        e.preventDefault()
        try {
            await axios.post('http://localhost:3012/newfeedback',sendFeedback)
            window.location.reload()
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <div className="homeMainDiv">
                <div className="d-flex homeSecondDiv column-gap-3">

    {/* Left */}

                    <div className="col-3 leftHome p-2">
                        <div className='text-center p-4'>
                            <h3 className="homeLogo"><FontAwesomeIcon className="text-danger" icon="fa-brands fa-react" size="2xl"/> Forum - T   </h3>
                        </div>
                        <div className="text-center p-2 border-bottom">
                            <a href="#" className="text-decoration-none"><h3>Home</h3></a>
                        </div>
                        <div className="text-center p-2 border-bottom">
                            <h3><Link className="text-decoration-none " to={'/'}>LogOut</Link></h3>
                        </div>
                    </div>

    {/* Center */}

                    <div className="col-6 homeMiddleDiv">

                        <div className="shadow-sm m-3 bg-primary-subtle rounded sticky-top">
                            <div className="text-center ">
                                <p>Indian Standard Time {date.toLocaleTimeString()}</p>
                            </div>          
                        </div>

                        <div className="p-3">
                            <form className="border bg-primary-subtle createPostDiv  p-3" onSubmit={handlesubmit}>
                                <input type="text" className="createPostInput border text-primary" name="post" onChange={handlechange} id="newPost" minLength={1}></input>
                                <br/><br/>
                                <button className="btn btn-primary postButton">Post</button>
                            </form>
                        </div>

                        <div className="viewPostDiv p-3">
                            {
                                viewposts.map((value) => (
                                    <>
                                        <div className="postInnerDiv border bg-primary-subtle" key={value.id}>
                                            <section className="row">
                                            <section className="col-6 ">
                                                <h6 className="form-text p-1">Posted By: <span className="text-decoration-line-through">ABCD</span> </h6>
                                            </section>
                                            <section className="col-6">
                                                <h6 htmlFor="postArea" className="form-text text-end p-1"> {value.created_time.toString().split("T")[0]} </h6>
                                            </section>
                                            </section>
                                            <p className="p-4 postArea ">{value.post}</p>
                                        </div>
                                        <br />
                                    </>
                                ))
                            }
                        </div>
                    </div>

    {/* Right */}
                    <div className="col-3 rightHome p-2">
                        <div className="p-3">
                            <h4 className="align-baseline">User Feedbacks:</h4> 
                        </div>
                        <dl className="m-3">
                            <dd>
                                <div>
                                    {Feedback.map((value)=>(
                                        <>
                                        <section key={value.id} className="border rounded">
                                            <p className="p-1 form-text">{value.feedback}</p>
                                        </section><br/>
                                        </>
                                    ))}
                                </div>
                            </dd>
                        </dl>
                        <div className="text-center m-3 p-2 border bg-primary-subtle rounded">
                            <input className="form-control" name="feedback" onChange={handleFeedback} ></input><br/>
                            <button className="form-control btn btn-primary" onClick={handleFeedbackSubmit}> Submit Feedback</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
