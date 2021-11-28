const {MongoClient} = require("mongodb")
const mongoose = require("mongoose")
exports.initializeDB = async () => {
    // console.log(process.env.MONGO_URI)
    // const client = new MongoClient(process.env.MONGO_URI);
    try {
        // Connect to the MongoDB cluster
        // await client.connect();
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    } catch (e) {
        console.log("Unable to connected to DB")
        console.error(e);
    }
    
}
