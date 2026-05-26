import CreatedTransaction from "../models/CreatedTransaction";

const TransactionService = {
    async createTransaction(carData) {
        return await CreatedTransaction.createListingWithMedia(carData);
    },
};

export default TransactionService;