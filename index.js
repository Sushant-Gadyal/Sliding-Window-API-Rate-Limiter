import express from "express";
import 'dotenv/config'; // Load env variables at the very start

import router from "./routes/routes.js"
import redis from "./config/redisClient.js";


const app = express();


app.use("/", router);

app.get("/server", (req,res) => {
    res.send("Hello");
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT http://localhost:${process.env.PORT}`);
})