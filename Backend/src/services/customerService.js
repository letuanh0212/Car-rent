import CustomerRepository from "../models/customers.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
dotenv.config();
const CustomerService = {
    async registerCustomerService({ full_name, email, password, phone}) {
        if (!full_name || !email || !password || !phone) {
            throw new Error('MISSING_REQUIRED_FIELDS');
        }
        
        const existing = await CustomerRepository.findByEmail(email);
        if (existing) {
            throw new Error('EMAIL_ALREADY_EXISTS');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = await CustomerRepository.create({
            full_name,
            email,
            password: hashedPassword,
            phone
        });

        return customer;
    },
    async loginCustomerService({ email, password }) {
        if (!email || !password) {
            throw new Error('MISSING_REQUIRED_FIELDS');
        }

        const customer = await CustomerRepository.findByEmail(email);

        if (!customer) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const accessToken = generateAccessToken(customer);
        const refreshToken = generateRefreshToken(customer);
        return {
            accessToken,
            refreshToken
        };
    },
    async refreshAccessTokenService(refreshToken) {
        if (!refreshToken) {
            throw new Error('NO_REFRESH_TOKEN');
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const accessToken = generateAccessToken(decoded);
        const newRefreshToken = generateRefreshToken(decoded);

        return {
            accessToken,
            refreshToken: newRefreshToken
        };
    },
    async getAllCustomersService() {
        try{
            const customers = await CustomerRepository.getallcustomers();
            return customers;

        }catch(err) {
            throw err;
        }   
    },
    async getCustomerByIdService(id) {
        try {
            const customer = await CustomerRepository.getById(id);
            return customer;
        } catch (err) {
            throw err;
        }
    }
};
export default CustomerService;
