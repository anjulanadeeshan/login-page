const express = require("express");
const cors = require("cors");
const app = express();
require ("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

//routes
const routes = require("./routes");
app.get("/", (req, res) => res.send("API is running"));
app.use("/api", routes);

const port = 5000;

//db connenction
const connectDb = require("./connectDb");

const startServer = async () => {
    await connectDb();
    app.listen(port, ()=>{
        console.log(`server is listening on port ${port}`);
    })
}

startServer().catch((err) => {
    console.error("Failed to start server:", err);
});
