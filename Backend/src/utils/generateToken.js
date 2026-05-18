import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (customer) => {
    return jwt.sign(
        {
            id: customer.id,
            full_name: customer.full_name,
            email: customer.email
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
    );
};

const generateRefreshToken = (customer) => {
    return jwt.sign(
        {
            id: customer.id,
            full_name: customer.full_name,
            email: customer.email
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

export { generateAccessToken, generateRefreshToken };