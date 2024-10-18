const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Product {
    qrCode: String
    rfId: String
    productName: String
    quantity: Int
    price: Int
  }

  type Transaction {
    id: ID
    qrCode: String
    rfId: String
    price: Int
    totalPrice: Int
    date: String
  }             

  type Query {
    getTransactions(qrCode: String!): Product
  }

  type Mutation {
    checkinProduct(qrCode:String!, rfId: String!, productName: String!, quantity: Int! price: Int!): String
    storeTransaction(qrCode: String!, rfId: String!, price: Int!, quantity: Int!): String
  }
`);

module.exports = schema;
