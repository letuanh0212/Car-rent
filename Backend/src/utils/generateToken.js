import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (customer) => {
    return jwt.sign(
        {
            id: customer.id,
            full_name: customer.full_name,
            email: customer.email,
            phone: customer.phone
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
            email: customer.email,
            phone: customer.phone
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

const generateTokenAccount = (accountSystem) => {
    return jwt.sign(
        {
            id: accountSystem.id,
            email: accountSystem.email,
            role: accountSystem.role
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
    );
};
export  { generateAccessToken, generateRefreshToken, generateTokenAccount };