import http from "http"
import os from "os"
const port=5001;
let body="";
const data=[];
const server=http.createServer((req,res)=>{
   const url=req.url;
   const method=req.method;
   if(url=="/" && method=="GET"){
    res.end("Home Page")
   }
   else if(url=="/contact" && method=="GET"){
    res.end("Contact Page")
   }
   else if(url=="/system" && method=="GET"){
    const sysdata={
        platform: os.platform(),
        Architecture: os.arch(),
        Cpu_length: os.cpus().length,
        TotalMemory: (os.totalmem()/1024**3).toFixed(2)+"GB",
        FreeRam:(os.freemem()/1024**3).toFixed(2)+"GB"
    }
    res.end(JSON.stringify(sysdata))
   }
   else if(url=="/senddata" && method=="POST"){
    
    req.on("data",(chunk)=>{
           body=body+chunk;
    })
    req.on("end",()=>{
        console.log(body, "Data Recived")
        data.push(body);
        res.statusCode=201;
        res.end(JSON.stringify(data));
    })
   }
   else if(url=="/viewdata" && method=="GET"){
    res.end(JSON.stringify(data))
   }
   else{
    res.statusCode=404;
   res.end("Error PAge")
   }
 
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})