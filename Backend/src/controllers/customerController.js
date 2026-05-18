import CustomerService from "../services/customerService.js";

const customerController = {
    async registerCustomerController (req, res)  {
        try {
            const data = req.body;
            const newCustomer = await CustomerService.registerCustomerService(data);
            res.status(201).json({ success: true, data: newCustomer });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    async loginCustomerController (req, res)  {
        try {
            const { email, password } = req.body;
            const customer = await CustomerService.loginCustomerService({ email, password });
            res.status(200).json({ success: true, data: customer });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async getAllCustomersController(req, res) {
        try {
            const customers = await CustomerService.getAllCustomersService();
            res.status(200).json({ success: true, data: customers });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    async getCustomerByIdController(req, res) {
        try {
            const { id } = req.params;
            const customerData = await CustomerService.getCustomerByIdService(id);
            if (!customerData) {
                return res.status(404).json({ success: false, message: 'Customer not found' });
            }
            res.status(200).json({ success: true, data: customerData });
        } catch (err) {

            res.status(500).json({ success: false, message: err.message });
        }   
    } 
};
export default customerController;