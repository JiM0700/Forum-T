const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mysql = require('mysql')

const node = express();
node.use(cors());
node.use(bodyparser.json());
node.use(express.json());
node.use(bodyparser.urlencoded({require:true}));
node.use(express.static('public'));

let link = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"Janaki12",
    database: "forum_t"
}) 

link.connect(function(error){
    if(error) console.log(error);
    console.log("Connection Successfull");
}) 


//USER SIGNUP
node.post("/signup",(request,response)=>{
    let query = "INSERT INTO forum_t.user_information (`first_name`,`last_name`,`age`,`date_of_birth`,`gender`,`mobile_number`,`email_id`,`password`) VALUES (?,?,?,?,?,?,?,?)"
    let {first_name,last_name,age,date_of_birth,gender,mobile_number,email_id,password} = request.body;
    
    link.query(query,[first_name,last_name,age,date_of_birth,gender,mobile_number,email_id,password],(error,result)=>{
        if(error){
            let res = {"status":"Error"}
            console.log(error);
            response.send(res);
        } else {
            let res = {"Status":"Success"}
            console.log("User Created");
            response.send(result);
        }
    })
})

//USER LOGIN
node.post('/login',(request,response)=>{
    let query = "SELECT * FROM user_information WHERE email_id = ? AND password = ?"
    link.query(query,[request.body.email_id,request.body.password],(error,result)=>{
        if(error) return response.status(500).json({status:500,data:error})
        else {
            return response.status(200).json({status:200,data:result})
        }    
    })
})

//(!ADMIN) LOGIN
node.post('/adminlogin',(request,response)=>{
    let query = "SELECT * FROM user_information WHERE email_id = ? AND password = ? AND is_admin = 1"
    link.query(query,[request.body.email_id,request.body.password],(error,result)=>{
        if(error) {
            return response.status(500).json({status:500,data:error})
        } else {
        return response.status(200).json({status:200,data:result})
        }
    })
})
// (!ADMIN) GET ALL USER INFO
node.get('/admingetall',(req,resp)=>{
    let query = "SELECT * FROM forum_t.user_information";
    link.query(query,(err,result)=>{
        if(err) resp.send(err)
        resp.send(result)
    })
})

// (!ADMIN) GET ALL POST
node.get('/admingetpost',(request,response)=>{
    let query = "SELECT * FROM forum_t.user_post";
    link.query(query,(error,result)=>{
        if(error) response.send(error)
        response.send(result)
    })
})

// (!ADMIN) GET ALL FEEDBACKS
node.get('/admingetfeedback',(request,response)=>{
    let query = "SELECT * FROM forum_t.user_feedback";
    link.query(query,(error,result)=>{
        if(error) response.send(error)
        response.send(result)
    })
})

//(!ADMIN) MAKE ADMIN
node.put('/makeadmin/:id',(request,response)=>{
    let {id} = request.params
    let query = "UPDATE user_information SET is_admin=1 WHERE id = ?"
    link.query(query,id,(error,result)=>{
        if(error) return response.send(error)
        return response.send("success")
    })
})

//(!ADMIN) REMOVE ADMIN
node.put('/removeadmin/:id',(request,response)=>{
    let {id} = request.params
    let query = "UPDATE user_information SET is_admin=0 WHERE id = ?"
    link.query(query,id,(error,result)=>{
        if(error) return response.send(error)
        return response.send("success")
    })
})

// (!ADMIN) MAKE USER ACTIVE
node.put('/reactive/:id',(request,response)=>{
    let {id} = request.params
    let query = "UPDATE user_information SET is_active=1 WHERE id = ?"
    link.query(query,id,(error,result)=>{
        if(error) return response.send(error)
        return response.send("Made Active")
    })
})

// (!ADMIN) DELETE USER (SOFT DELETE)
node.put('/softdelete/:id',(request,response)=>{
    let {id} = request.params
    let query = "UPDATE user_information SET is_active=0 WHERE id = ?"
    link.query(query,id,(error,result)=>{
        if(error) return response.send(error)
        return response.send("Made Inactive")
    })
})

// (!ADMIN) DELETE USER
node.delete('/deleteuser/:id',(request,response)=>{
    let {id} = request.params;
    let query = "DELETE FROM forum_t.user_information WHERE id = ? "
    link.query(query,id,(error,result)=>{
        if(error) return response.send(error)
        return response.send(result)
    })
})

// (!ADMIN) DELETE USER
node.delete('/deletepost/:id',(request,response)=>{
    let {id} = request.params;
    let query = "DELETE FROM forum_t.user_post WHERE id = ? "
    link.query(query,id,(error,result)=>{
        if(error) return response.send(error)
        return response.send(result)
    })
})


// (!ADMIN) DELETE FEEDBACK
node.delete('/deletefeedback/:id',(request,response)=>{
    let {id} = request.params;
    let query = "DELETE FROM forum_t.user_feedback WHERE id = ? "
    link.query(query,id,(error,result)=>{
        if(error) return response.send(error)
        return response.send(result)
    })
})


//GET ALL POST FOR HOMEPAGE
node.get('/getpost',(request,response)=>{
    let query = "SELECT post,created_time FROM forum_t.user_post ORDER BY id desc";
    link.query(query,(error,result)=>{
        if(error) resp.send(error)
        response.send(result)
    })
})

//CREATE NEW POST
node.post("/newpost",(request,response)=>{

    let query = "INSERT INTO forum_t.user_post (post) VALUES (?)";
    let { id } = request.params
    let{post} = request.body;

    link.query(query,[post],(error,result)=>{
        if(error){
            let res = {"status":"Error"}
            console.log(error);
            response.send(res);
        } else {
            let res = {"Status":"Success"}
            console.log("Post Created Successfully");
            response.send(result);
        }
    })
})

//GET ALL FEEDBACK
node.get('/getfeedback',(request,response)=>{
    let query = "SELECT feedback FROM user_feedback ORDER BY id desc"
    link.query(query,(error,result)=>{
        if(error) response.send(error)
        response.send(result)
    })
})

//ADD FEEDBACK
node.post('/newfeedback',(request,response)=>{
    let { feedback } = request.body
    let query = "INSERT INTO forum_t.user_feedback (feedback) VALUES (?)";

    link.query(query,[feedback],(error,result)=>{
        if(error){
            let res = {"status":"Error"}
            console.log(error);
            response.send(res);
        } else {
            let res = {"Status":"Success"}
            console.log("Reply Created Successfully");
            response.send(result);
        }
    })
})

node.listen(3012,()=> console.log("Running on Port 3012") )