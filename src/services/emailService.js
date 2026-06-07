const nodemailer = require('nodemailer');

const sendVerificationEmail = async (user, verificationUrl) => {
  let transporter;

  // Use real SMTP in production when configured
  if (process.env.NODE_ENV === 'production' && process.env.EMAIL_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Development/test: create an Ethereal test account for previewable emails
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    } catch (err) {
      // Fallback to JSON transport if creating test account fails
      transporter = nodemailer.createTransport({ jsonTransport: true });
    }
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@example.com',
    to: user.email,
    subject: 'Verify your account',
    html: `<p>Hello ${user.name || 'user'},</p>
           <p>Please verify your email by clicking the link below:</p>
           <p><a href="${verificationUrl}">Verify email</a></p>`
  };

  const info = await transporter.sendMail(mailOptions);

  // In non-production, log useful preview URL or the JSON message
  if (process.env.NODE_ENV !== 'production') {
    try {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Email send info (dev):', info);
      if (previewUrl) {
        console.log('Preview URL:', previewUrl);
      } else if (info && info.message) {
        console.log(info.message.toString());
      }
    } catch (e) {
      // ignore logging errors
    }
  }
};

module.exports = { sendVerificationEmail };
