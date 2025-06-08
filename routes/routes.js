import {Router } from "express";
import rateLimiter from "../middlewares/rateLimiter.js";

const router = Router();


router.get("/", rateLimiter({ secondsWindow: 60, allowedHits: 10 }), (req, res) => {
    res.json({
        message: "success",
        from: "home page",
    })
})

router.get("/api1", rateLimiter({ secondsWindow: 20, allowedHits:5 }), (req, res) => {
    res.json({
        message: "success",
        from: "api-1",
    })
})

router.get("/api2", rateLimiter({ secondsWindow: 120,  allowedHits: 20 }), (req, res) => {
    res.json({
        message: "success",
        from: "api-2",
    })
})

router.get("/api3", rateLimiter({ secondsWindow: 120, allowedHits: 30 }), (req, res) => {
    res.json({
        message: "success",
        from: "api-3",
    })
})

router.get("/test", rateLimiter({ secondsWindow:10, allowedHits: 5 }), (req, res) => {
    res.send("You are allowed");
})

export default router;

