const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (user, verificationUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify your account',
    html: `<p>Hello ${user.name || 'user'},</p>
           <p>Please verify your email by clicking the link below:</p>
           <p><a href="${verificationUrl}">Verify email</a></p>`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
