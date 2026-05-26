import CreatedTransaction from "../models/CreatedTransaction.js";

const TransactionService = {
    async createTransaction(carData) {
        return await CreatedTransaction.createListingWithMedia(carData);
    },
};

export default TransactionService;
