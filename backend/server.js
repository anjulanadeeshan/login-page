const express = require("express");

const app = express();

app.get("/hello" , (req,res)=>{
    res.status(200).json({msg:"backend ok"})
})

const port = 5000;

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})