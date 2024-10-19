// Import required modules
const axios = require("axios");
const mongoose = require("mongoose");
const { Contact } = require("./contact.model");
require("dotenv").config();

const sendMessage = async (req, res) => {
	try {
		const { message, contacts } = req.body;

		// Fetch all contacts from MongoDB
		// const contacts = await Contact.find();
		// console.log(`${contacts.length} contacts fetched`);

		// Loop through contacts and send messages

		if (!message && contacts.length == 0)
			return res.status(404).json("Please send the required data");

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
		console.log(error);
		return res
			.status(500)
			.json({ messaage: "Error sending message", error: error.message });
	}
};

// Main function to fetch contacts and send messages
const sendMediaMessage = async (req, res) => {
	try {
		const { caption, imageUrl, contacts } = req.body;

		if (!message || !caption || contacts.length == 0)
			return res.status(404).json("Please send the required data");

		// Fetch all contacts from MongoDB
		// const contacts = await Contact.find();
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
		console.log(error);
		return res
			.status(500)
			.json({ messaage: "Error sending message", error: error.message });
		return res.status(500).json("Error sending message");
	}
};

module.exports = { sendMessage, sendMediaMessage };
