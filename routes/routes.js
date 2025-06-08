import {Router } from "express";
const router = Router();

router.get("/", (req,res)=>{
    res.json({
        message : "success",
        from : "home page",
    })
})

router.get("/api1", (req,res)=>{
    res.json({
        message : "success",
        from : "api-1",
    })
})

router.get("/api2", (req,res)=>{
    res.json({
        message : "success",
        from : "api-2",
    })
})

router.get("/api3", (req,res)=>{
    res.json({
        message : "success",
        from : "api-3",
    })
})

export default router;