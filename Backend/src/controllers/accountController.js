import UserService from "../services/userService.js";
import bycrypt from "bcrypt";
const userController = {
    async registerController (req, res) {
        try {
                const data = req.body;
                const newUser = await UserService.registerService(data );
                res.status(201).json({ success: true, data: newUser });
            } catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        },
   
    async loginController (req, res)  {
        try {
            const { email, password } = req.body;
            const user = await UserService.loginService({ email, password });
            res.status(200).json({ success: true, data: user });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
};
export default userController;