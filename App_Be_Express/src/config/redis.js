const { createClient } = require('redis');

const connectRedis = () => {
  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  redisClient.connect().then(() => {
    console.log('Connected to Redis');
  }).catch((err) => {
    console.error('Error connecting to Redis:', err);
  });

  return redisClient;
};

module.exports = connectRedis;
