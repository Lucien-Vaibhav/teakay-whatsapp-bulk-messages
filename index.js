// Import required modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Loads environment variables
const { sendMediaMessage, sendMessage } = require("./message.controller");
const {
	addBulkContacts,
	getContacts,
	addContact,
	modifyContactName,
	deleteContact,
} = require("./contact.controller");

// Initialize Express
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Define the port
const PORT = process.env.PORT || 3000;

// MongoDB connection function
// async function connectDB() {
// 	try {
// 		await mongoose.connect(process.env.MONGO_URI); // No need for useNewUrlParser and useUnifiedTopology
// 		console.log("Connected to MongoDB");
// 	} catch (error) {
// 		console.error("Error connecting to MongoDB:", error.message);
// 		process.exit(1); // Exit the process if MongoDB connection fails
// 	}
// }

// // Call the MongoDB connection function
// connectDB();

// Endpoint to trigger sending bulk messages
app.post("/send-messages", sendMessage);
app.post("/send-media-messages", sendMediaMessage);
app.get("/contact", getContacts);
app.post("/contact", addContact);
app.delete("/contact", deleteContact);
app.patch("/contact", modifyContactName);
app.post("/contact/addMany", addBulkContacts);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
