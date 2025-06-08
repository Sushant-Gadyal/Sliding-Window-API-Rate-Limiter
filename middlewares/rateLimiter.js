import express from "express";
import redis from "../config/redisClient.js";

const rateLimiter = ({ secondsWindow , allowedHits }) => {
    return async function(req, res, next){

        const ipAddress = req.ip;
        const key = `rate_limit:${ipAddress}`;

        const currentSeconds = Math.floor( Date.now() / 1000 ) ;


        const exists  = await redis.exists(key);
        if(!exists){
            console.log(`${key} does not exists`);
            const res_add = await redis.zADD(key, currentSeconds, currentSeconds.toString());
        }
        else{
            
        }

        next();
    }

}

export default rateLimiter;