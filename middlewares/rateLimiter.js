import express from "express";

const rateLimiter = ({ secondsWindow , allowedHits }) => {
    return function(req,res,next){
        console.log(`${secondsWindow}  +  ${allowedHits}`);
        next();
    }

}

export default rateLimiter;