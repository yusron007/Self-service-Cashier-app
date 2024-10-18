const redisClient = require('../../../src/config/redis')();
const Transaction = require('../../../src/model/transactions');
const connectPostgres = require('../../../src/config/postgres');

const storeTransaction = async ({ qrCode, rfId, price, quantity }) => {
  let client;
  try {
    // Ambil data produk dari Redis berdasarkan rfId
    const productData = await redisClient.get(`product:${qrCode}`);
    if (!productData) throw new Error('Product not found in Redis.');


    const product = JSON.parse(productData);
    const totalPrice = price * quantity;

    client = await connectPostgres();

    // 1. Cek saldo wallet customer di PostgreSQL
    const { rows } = await client.query('SELECT wallet FROM customers WHERE qr_code = $1', [qrCode]);
    if (rows.length === 0) throw new Error('Customer not found in PostgreSQL.');

    const walletBalance = rows[0].wallet;
    if (walletBalance < totalPrice) {
      throw new Error('Insufficient wallet balance for this transaction.');
    }

    // 2.1 Simpan transaksi ke MongoDB
    const transaction = new Transaction({
      qrCode,
      rfId: product.rfId,
      price: product.price,
      quantity,
      totalPrice,
      date: new Date().toISOString(),
    });

    await transaction.save();
    console.log(`Transaction for RFID ${rfId} stored in MongoDB successfully.`);

    // 2.2 Kurangi saldo wallet di PostgreSQL setelah transaksi
    const newBalance = walletBalance - totalPrice;
    await client.query('UPDATE customers SET wallet = $1 WHERE qr_code = $2', [newBalance, qrCode]);
    console.log(`Wallet for customer with QRCode ${qrCode} updated successfully. New balance: ${newBalance}`);

    // 2.3 Transfer transaksi ke PostgreSQL
    try {
      await client.query('BEGIN');

      await client.query(
          'INSERT INTO transactions(qr_code, rf_id, price, quantity, total_price, date) VALUES($1, $2, $3, $4, $5, $6)',
          [transaction.qrCode, transaction.rfId, transaction.price, transaction.quantity, transaction.totalPrice, transaction.date]
      );

      await client.query('COMMIT');
      console.log(`Transaction for QRCode ${qrCode} transferred to Postgres successfully.`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error('Failed to transfer transaction to Postgres: ' + error.message);
    }

    // 2.4 Hapus data dari Redis setelah transaksi selesai
    await redisClient.del(`product:${qrCode}`);
    console.log(`Product with QRCode ${qrCode} removed from Redis.`);

    return `Transaction processed successfully for QRCode ${qrCode}.`;
  } catch (error) {
    throw new Error('Failed to process transaction: ' + error.message);
  }
};

module.exports = { storeTransaction };
