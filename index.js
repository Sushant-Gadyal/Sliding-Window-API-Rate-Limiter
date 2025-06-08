import express from "express";

const app = express();
const PORT = 8050;

app.get("/", (req,res) => {
    res.send("Hello");
})

app.listen(PORT, () => {
    console.log(`Server running on PORT http://localhost:${PORT}`);
})