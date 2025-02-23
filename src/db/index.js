import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const database = client.db("bistro-boss");

async function connectDB() {
  try {
    console.log("Successfully connected to MongoDB!!");
  } catch (err) {
    console.log(`MONGODB CONNECTION ERROR: ${err}`);
  }
}

export default connectDB;
