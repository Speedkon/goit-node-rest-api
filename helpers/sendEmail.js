const sgMail = require("@sendgrid/mail");
require('dotenv').config()
const { SG_API_KEY } = process.env

sgMail.setApiKey(SG_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "speedkon.official@gmail.com" };
    await sgMail.send(email);
    return { ok: true };
};

module.exports = sendEmail;