import UserRepository from "../models/account.js";
import bcrypt from "bcrypt";
import  {generateTokenAccount}  from "../utils/generateToken.js";
const accountSystemService = {
    async registerService({ email, password, role }) {
        if (!email || !password) {
        throw new Error('MISSING_REQUIRED_FIELDS');
        }

        const existing = await UserRepository.findByEmail(email);
        if (existing) {
        throw new Error('EMAIL_ALREADY_EXISTS');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserRepository.create({
        email,
        password: hashedPassword,
        role
        });

        return {
        email: user.email
        };
    },

    async loginService({ email, password }) {

        if (!email || !password) {
            throw new Error('MISSING_REQUIRED_FIELDS');
        }

        const user =
            await UserRepository.findByEmail(email);

        if (!user) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const accessTokenaccount = generateTokenAccount(user);

        return {

            accessTokenaccount
        };
    }

};
export default accountSystemService;