import redis from "../config/redisClient.js";

const rateLimiter = ({ secondsWindow , allowedHits }) => {
    return async function(req, res, next){
        const ipAddress = req.ip;
        const key = `rate_limit:${ipAddress}`;
        const currentSeconds = Math.floor( Date.now() / 1000 );

        const exists  = await redis.exists(key);
        if(!exists){
            console.log(`${key} does not exists`);
            const res_add = await redis.zadd(key, currentSeconds, currentSeconds);
            next();
        }
        else{
            const notInWindow = currentSeconds - secondsWindow;
            const req_remove = await redis.zremrangebyscore(key, 0, notInWindow);
            console.log(`No of requests removed: ${req_remove}`);

            const rate_limit_size = await redis.zcard(key);
            console.log(`Set size is: `, rate_limit_size);

            if(rate_limit_size == allowedHits){
                return res.status(429).json({
                    message: "Too many requests, Please try again later!",
                    limit: allowedHits,
                    windowSeconds: secondsWindow,
                });
            }
            else{
                const res_add = await redis.zadd(key, currentSeconds, currentSeconds); 
                console.log(`New element added successfully: `, res_add);
                next();
            }
        }

    }

}

export default rateLimiter;