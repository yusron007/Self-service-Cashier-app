const redisClient = require('../../../src/config/redis')();

const checkinProduct = async ({ qrCode, rfId, productName, quantity, price }) => {
  const product = { qrCode, rfId, productName, quantity, price };

  try {
    await redisClient.set(`product:${qrCode}`, JSON.stringify(product));

    return `Product ${productName} with RFID ${rfId} checked in by QRCode ${qrCode} successfully.`;
  } catch (error) {
    throw new Error('Failed to check in product: ' + error.message);
  }
};

module.exports = { checkinProduct };
