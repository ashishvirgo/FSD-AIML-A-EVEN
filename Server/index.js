import http from 'http';
import os from 'os';
const port=5001;
const server=http.createServer((req,res)=>{
   const url=req.url;
   if(url=="/" && req.method=="GET"){
    res.statusCode=201;
    res.write("<h1>Hello Ashish</h1>");
   }
   else if(url=="/system" && req.method=="GET"){
    res.statusCode=201;
    const data={
        platform: os.platform(),
        cpu: os.cpus(),
        Arch: os.arch(),
        FreeMemory: (os.freemem()/1024**3).toFixed(2)+"GB",
        TotalMemory: (os.totalmem()/1024**3).toFixed(2)+"GB"
    }
    res.write(JSON.stringify(data));
   }
   else{
    res.statusCode=404;
    res.write("<h1>Page not found</h1>");
   }
   res.end();
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})