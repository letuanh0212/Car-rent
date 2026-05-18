import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút."
});

export default limiter;