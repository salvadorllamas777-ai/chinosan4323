const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, verificationToken });
    const appUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 3000}`;
    const verificationUrl = `${appUrl}/api/auth/verify?token=${verificationToken}`;

    await sendVerificationEmail(user, verificationUrl);

    const userData = user.toJSON ? user.toJSON() : { ...user };
    delete userData.password;

    res.status(201).json({
      message: 'Registration successful. Check your email to verify your account.',
      user: userData
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOneAndUpdate(
      { verificationToken: token },
      { verified: true, verificationToken: undefined },
      { new: true }
    );
    if (!user) return res.status(400).json({ error: 'Invalid or expired verification token' });

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    if (!user.verified) return res.status(401).json({ error: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const userData = user.toJSON ? user.toJSON() : { ...user };
    delete userData.password;
    const token = generateToken(user);
    res.json({ user: userData, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
