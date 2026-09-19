import { Enquiry } from '../models/Enquiry.js';
import { sendAdminEnquiryAlert } from '../config/emailService.js';

// In-memory fallback array for leads submitted when MongoDB is offline
const memoryEnquiries = [];

export const submitEnquiry = async (req, res) => {
  const { name, company, email, phone, projectType, budget, message } = req.body;

  if (!name || !email || !projectType || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required fields: Name, Email, Project Type, and Message.',
    });
  }

  const enquiryData = {
    name,
    company: company || '',
    email,
    phone: phone || '',
    projectType,
    budget: budget || 'Undisclosed',
    message,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  // Dispatch Gmail lead alert ONLY to admin in background
  sendAdminEnquiryAlert(enquiryData).catch((err) => {
    console.error('Admin email alert error:', err);
  });

  try {
    const enquiry = new Enquiry(enquiryData);
    await enquiry.save();
    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your project enquiry has been submitted successfully. Our engineering team will review it and get in touch promptly.',
      enquiry,
    });
  } catch (error) {
    // Save to in-memory fallback store
    enquiryData._id = `enq_${Date.now()}`;
    memoryEnquiries.unshift(enquiryData);
    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your enquiry has been recorded. Our team will contact you shortly.',
      enquiry: enquiryData,
    });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const dbEnquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    const combined = [...dbEnquiries, ...memoryEnquiries];
    return res.json({ success: true, enquiries: combined });
  } catch (error) {
    return res.json({ success: true, enquiries: memoryEnquiries });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['new', 'contacted', 'in-progress', 'completed', 'archived'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  try {
    const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (enquiry) {
      return res.json({ success: true, enquiry });
    }

    const memItem = memoryEnquiries.find((e) => e._id === id);
    if (memItem) {
      memItem.status = status;
      return res.json({ success: true, enquiry: memItem });
    }

    return res.status(404).json({ success: false, message: 'Enquiry record not found' });
  } catch (error) {
    const memItem = memoryEnquiries.find((e) => e._id === id);
    if (memItem) {
      memItem.status = status;
      return res.json({ success: true, enquiry: memItem });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};
