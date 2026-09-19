import { CompanyInfo } from '../models/CompanyInfo.js';

export const defaultCompanyInfo = {
  email: 'gnanastacktechnologies@gmail.com',
  phone: '+91 6379250367',
  location: 'Salem, Tamil Nadu, India - 636117',
  tagline: 'From Village Vision to Digital Innovation',
};

export const getCompanyInfo = async (req, res) => {
  try {
    let info = await CompanyInfo.findOne({});
    if (!info) {
      info = await CompanyInfo.create(defaultCompanyInfo);
    }
    return res.json({ success: true, company: info });
  } catch (error) {
    return res.json({ success: true, company: defaultCompanyInfo });
  }
};

export const updateCompanyInfo = async (req, res) => {
  const { email, phone, location } = req.body;
  try {
    let info = await CompanyInfo.findOne({});
    if (info) {
      if (email) info.email = email;
      if (phone) info.phone = phone;
      if (location) info.location = location;
      await info.save();
    } else {
      info = await CompanyInfo.create({
        email: email || defaultCompanyInfo.email,
        phone: phone || defaultCompanyInfo.phone,
        location: location || defaultCompanyInfo.location,
      });
    }
    return res.json({ success: true, company: info });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
