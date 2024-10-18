require('dotenv').config();

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');
const { checkinProduct } = require('./src/graphql/resolvers/checkinProduct');
const { storeTransaction } = require('./src/graphql/resolvers/storeTransactions');
const { getTransactions } = require('./src/graphql/resolvers/getTransactions');
const connectMongoDB = require('./src/config/mongo');
const connectRedis = require('./src/config/redis');
const connectPostgres = require('./src/config/postgres');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

// Connect to databases
connectMongoDB();
connectRedis();
connectPostgres();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: {
    checkinProduct,
    storeTransaction,
    getTransactions
  },
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
