# Sliding Window API Rate Limiter

A simple Node.js (Express + Redis) API rate limiter using the sliding window algorithm.  
This middleware tracks user requests by IP and restricts the number of requests allowed in a given time window.  


---

##  Features

- Sliding window rate limiting with configurable window size and hit count
- Redis backend for distributed environments and performance
- Plug-and-play Express middleware
- Clear console logs for debugging and understanding flow
- Dynamic configuration: Easily set the time window and request limit per route or endpoint.

---

##  Setup & Installation

### 1. **Clone the Repository**

```bash
git clone https://github.com/Sushant-Gadyal/Sliding-Window-API-Rate-Limiter.git
cd Sliding-Window-API-Rate-Limiter
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Setup Environment Variables**

Create a `.env` file in the root directory and add the following (replace with your Redis and server config):

```env
PORT=8050
REDIS_HOST=your-redis-cloud-endpoint.redislabs.com
REDIS_PORT=your-redis-cloud-port   # usually a 4-5 digit number, e.g., 12345
REDIS_PASSWORD=your-redis-cloud-password
```

### 4. **Start Redis**

Make sure you have Redis running locally or use a remote Redis instance.

```bash
# Start Redis (if installed locally)
redis-server
```

---


##  Usage

### 1. **Start the API Server**

```bash
npm start
```

### 2. **Test the Rate Limiter**

A sample endpoint is set up for demonstration.

#### Example Endpoint (in `index.js`):

```js
import rateLimiter from './middlewares/rateLimiter.js';

app.get('/test', rateLimiter({ secondsWindow: 10, allowedHits: 5 }), (req, res) => {
  res.send('You are allowed!');
});
```

#### **Test with cURL**

```bash
for i in {1..10}; do
  curl -i http://localhost:3000/test
done
```


---

##  How It Works

- Each incoming request's IP is used as a unique key in Redis.
- Request timestamps are stored in a sorted set.
- When a request comes in:
  - Old timestamps (outside the window) are removed.
  - If the count of timestamps is below the allowed limit, the request is allowed and timestamp is added.
  - If the limit is reached, request is blocked with HTTP 429.

---
##  Configuration

This rate limiter middleware is **fully dynamic**—you can set the time window and allowed request count for each route as needed.

### Usage Example

Apply different rate limits to different routes:

```js
import rateLimiter from './middlewares/rateLimiter.js';

// Limit: 5 requests per 10 seconds on '/test'
app.get('/test', rateLimiter({ secondsWindow: 10, allowedHits: 5 }), (req, res) => {
  res.send('You are allowed!');
});

// Limit: 100 requests per minute on all '/api' routes
app.use('/api', rateLimiter({ secondsWindow: 60, allowedHits: 100 }));
```

### Parameters

- **secondsWindow**:  
  _Type_: `number`  
  The length of the sliding window, in seconds (e.g., `60` for one minute).

- **allowedHits**:  
  _Type_: `number`  
  The maximum number of requests allowed from a single IP within the window.

### Example

```js
rateLimiter({ secondsWindow: 30, allowedHits: 10 }) // 10 requests per 30 seconds
```

> **Tip:** You can apply different limits for different endpoints to match your API's requirements.
---

##  Example Response

- **Allowed request:**
  ```
  HTTP/1.1 200 OK
  You are allowed!
  ```
- **Rate limited:**
  ```
  HTTP/1.1 429 Too Many Requests
  {
    "message": "Too many requests, Please try again later!",
    "limit": 5,
    "windowSeconds": 10
  }
  ```

---

##  Project Structure

```
├── config/
│   └── redisClient.js
├── middlewares/
│   └── rateLimiter.js
├── routes/
│   └── routes.js
├── index.js
├── package.json
├── .env
├── README.md


```

##  Development Notes

- **Logs:** The middleware logs each action (requests added, removed, blocked) to the console for transparency.
- **Edge Cases:** Burst requests or requests at the window boundary are handled correctly by the sliding window logic.
- **Production:** Use environment variables for all secrets and configs. Secure Redis with authentication in production.

---

##  Dependencies

- express
- ioredis
- dotenv

Install them all with `npm install`.

---

## ⭐️ Star this repo if you found it helpful!