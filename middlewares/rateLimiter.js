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
            const res_add = await redis.zadd(key, currentSeconds, currentSeconds);
        }
        else{
            const notInWindow = currentSeconds - secondsWindow;
            const req_remove = await redis.zremrangebyscore(key, 0, notInWindow);
            console.log(`No of requests removed: ${req_remove}`);

            console.log(`Set size is: `, await redis.zcard(key));
        }

        next();
    }

}

export default rateLimiter;