const nodeMailer = require('nodemailer')
const adminEmail = process.env.EMAIL
const adminPassword = process.env.EMAILPASS
console.log(adminEmail);
console.log(adminPassword);
const mailHost = 'smtp.gmail.com'
const mailPort = 465

module.exports.transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: true, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
        user: adminEmail,
        pass: adminPassword
    }
})