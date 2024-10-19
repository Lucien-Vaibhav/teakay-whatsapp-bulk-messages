const { default: mongoose } = require("mongoose");

// MongoDB model for Contacts
const ContactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		unique: true,
		required: true,
	},
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = { Contact };
