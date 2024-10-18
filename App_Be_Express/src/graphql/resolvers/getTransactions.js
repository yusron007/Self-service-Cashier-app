const redisClient = require('../../../src/config/redis')();

const getTransactions= async ({ qrCode }) => {
    try {
        console.log(`Fetching product with key: product:${qrCode}`);

        const productData = await redisClient.get(`product:${qrCode}`);
        console.log(`Product data retrieved from Redis:`, productData);

        if (!productData) {
            console.error('Product not found in Redis.');
            throw new Error('Product not found.');
        }

        const product = JSON.parse(productData);

        return product;
    } catch (error) {
        console.error('Failed to retrieve product:', error.message);
        throw new Error('Failed to retrieve product: ' + error.message);
    }
};

module.exports = { getTransactions };

