console.log("VALUE OF MONGO_URI:", process.env.MONGO_URI);
console.log("MONGO_URI value at startup:", process.env.MONGO_URI);

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB!");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});
