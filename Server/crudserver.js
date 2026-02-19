import http from "http"
const port=5001;
const users=[{id:1,name:"xyz",email:"xyz@gmail.com"},
    {id:2,name:"xyz1",email:"xyz1@gmail.com"},
    {id:3,name:"xyz2",email:"xyz2@gmail.com"},
]
const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url=="/" && method=="GET"){
        res.end("Home Page")
    }
    else if(url=="/users" && method=="GET"){
        console.log(users)
        res.end(JSON.stringify(users))
    }
    else if(url.startsWith("/users/") && method=="GET"){
        const id=url.split("/")[2];
        const user=users.find(u=>u.id==id);
        if(!user){
            res.statusCode=400;
            console.log("User ",id," not Found")
            return res.end("User "+id+" not Found")
        }
        console.log("user ",id," Found successfully")
        res.end(JSON.stringify(user))
    }
    else if(url=="/createuser" && method=="POST"){
        let body="";
        req.on("data",(chunk)=>{
            body=body+chunk;
        })
        req.on("end",()=>{
            const newUser=JSON.parse(body);
            newUser.id=users.length+1;
            users.push(newUser);
            res.statusCode=201;
            res.end(JSON.stringify(newUser)+"user created Successfully")
        })
        
    }
    else if(url.startsWith("/users/") && method=="PUT"){
        console.log("Edit user")
        res.end("Edit User")
    }
    else if(url.startsWith("/users/") && method=="DELETE"){
        const id=url.split("/")[2];
        const userIndex=users.findIndex(u=>u.id==id);
        if(userIndex==-1)
        {
            console.log(`user id ${id} not found`);
            res.statusCode=400;
           return res.end(`user id ${id} not found`)
        }
        users.splice(userIndex,1);
        console.log(`user id ${id} deleted successfully`)
        res.end(`user id ${id} deleted successfully`)
    }
    else{
        res.statusCode=404;
        res.end("Error Page")
    }
})
server.listen(port,()=>{
    console.log(`Server is running on Port ${port}`)
})