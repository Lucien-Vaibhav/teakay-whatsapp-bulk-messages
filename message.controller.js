// Import required modules
const axios = require("axios");
const mongoose = require("mongoose");
const { Contact } = require("./contact.model");
require("dotenv").config();

// const contacts = [919175763384, 919175763384, 919175763384];

const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;

		// Fetch all contacts from MongoDB
		const contacts = await Contact.find();
		console.log(`${contacts.length} contacts fetched`);

		// Loop through contacts and send messages
		for (const contact of contacts) {
			let data = {
				message: message,
				chatId: `${contact.phone}@c.us`,
			};

			const response = await axios.post(
				`https://waapi.app/api/v1/instances/${process.env.WAAPI_INSTANCE_ID}/client/action/send-message`,
				data,
				{
					headers: {
						accept: "application/json",
						"content-type": "application/json",
						authorization:
							"Bearer tI7MX6tiosFdrPIp8SvaSxDV5uTbwGPSGx5ULQpFafcb5c8a",
					},
				}
			);
		}

		return res.status(200).json("message sent successfylly");
	} catch (error) {
		console.error("Error in sending bulk messages:", error.message);
		return res.status(500).json("Error sending message");
	}
};

// Main function to fetch contacts and send messages
const sendMediaMessage = async (req, res) => {
	try {
		const { caption, imageUrl } = req.body;

		console.log(req.body);

		// Fetch all contacts from MongoDB
		const contacts = await Contact.find();
		// console.log(`${contacts.length} contacts fetched`);

		// Loop through contacts and send messages
		for (const contact of contacts) {
			let data = {
				mediaUrl: imageUrl,
				chatId: `${contact.phone}@c.us`,
				mediaCaption: caption,
			};
			const response = await axios.post(
				`https://waapi.app/api/v1/instances/${process.env.WAAPI_INSTANCE_ID}/client/action/send-media`,
				data,
				{
					headers: {
						accept: "application/json",
						"content-type": "application/json",
						authorization:
							"Bearer tI7MX6tiosFdrPIp8SvaSxDV5uTbwGPSGx5ULQpFafcb5c8a",
					},
				}
			);
		}

		return res.status(200).json("message sent successfylly");
	} catch (error) {
		console.error("Error in sending bulk messages:", error.message);
		return res.status(500).json("Error sending message");
	}
};

module.exports = { sendMessage, sendMediaMessage };
