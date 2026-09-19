import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'gnanastack_secret_jwt_key_2026_super_secure', {
    expiresIn: '30d',
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id, user.role),
      });
    }

    // Fallback for default admin credentials if database user isn't found
    const defaultEmail = process.env.ADMIN_EMAIL || 'gnanastacktechnologies@gmail.com';
    const defaultPass = process.env.ADMIN_PASSWORD || 'Gnana@123';

    if (email.toLowerCase() === defaultEmail.toLowerCase() && password === defaultPass) {
      return res.json({
        success: true,
        user: { id: 'default_admin', name: 'GnanaStack Admin', email: defaultEmail, role: 'admin' },
        token: generateToken('default_admin', 'admin'),
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  return res.json({ success: true, user: req.user });
};
