// Import required modules
const axios = require("axios");
const mongoose = require("mongoose");
const { Contact } = require("./contact.model"); // Assuming you have defined the Contact model
require("dotenv").config();

// Add a single contact
const getContacts = async (req, res) => {
	try {
		const data = await Contact.find();

		return res
			.status(200)
			.json({ message: "Contact fetched successfully", contacts: data });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error fetching contacts", error: error.message });
	}
};

// Add a single contact
const addContact = async (req, res) => {
	try {
		const { name, phone } = req.body;

		// Create a new contact
		const newContact = new Contact({ name, phone });
		await newContact.save();

		return res
			.status(200)
			.json({ message: "Contact saved successfully", contact: newContact });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error saving contact", error: error.message });
	}
};

// Add bulk contacts
const addBulkContacts = async (req, res) => {
	try {
		const contacts = req.body.contacts; // Expecting an array of contacts [{name, phone}, ...]

		// Bulk insert contacts into MongoDB
		const bulkInsertResult = await Contact.insertMany(contacts);

		return res.status(200).json({
			message: `${bulkInsertResult.length} contacts saved successfully`,
			contacts: bulkInsertResult,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error saving contacts", error: error.message });
	}
};

// Delete a contact by phone number or ID
const deleteContact = async (req, res) => {
	try {
		const { phone } = req.body;

		// Find and delete contact by phone number
		const deletedContact = await Contact.findOneAndDelete({ phone });

		if (!deletedContact) {
			return res.status(404).json({ message: "Contact not found" });
		}

		return res.status(200).json({
			message: "Contact deleted successfully",
			contact: deletedContact,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error deleting contact", error: error.message });
	}
};

// Modify the name of a contact by phone number
const modifyContactName = async (req, res) => {
	try {
		const { phone, newName } = req.body;

		// Find the contact by phone and update the name
		const updatedContact = await Contact.findOneAndUpdate(
			{ phone },
			{ name: newName },
			{ new: true }
		);

		if (!updatedContact) {
			return res.status(404).json({ message: "Contact not found" });
		}

		return res.status(200).json({
			message: "Contact updated successfully",
			contact: updatedContact,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error updating contact", error: error.message });
	}
};

// Export the functions to be used in routes
module.exports = {
	getContacts,
	addContact,
	addBulkContacts,
	deleteContact,
	modifyContactName,
};
