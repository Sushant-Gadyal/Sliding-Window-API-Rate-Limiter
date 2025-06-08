import express from "express";
import router from "./routes/routes.js"

const app = express();
const PORT = 8050;

app.use("/", router);

app.get("/server", (req,res) => {
    res.send("Hello");
})

app.listen(PORT, () => {
    console.log(`Server running on PORT http://localhost:${PORT}`);
})