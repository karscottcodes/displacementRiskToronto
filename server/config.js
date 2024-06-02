//CONFIG FILE FOR nodemailer
//Empowers Contact Form

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

//Settings: Check .env
var transporter = nodemailer.createTransport({
	service: process.env.CONFIG_SERVICE,
	auth: {
		user: process.env.CONFIG_EMAIL,
		pass: process.env.CONFIG_PASS
	}
});

module.exports = transporter;
