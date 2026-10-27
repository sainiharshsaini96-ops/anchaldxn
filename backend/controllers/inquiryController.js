const Inquiry = require('../models/Inquiry');
const mongoose = require('mongoose');

const inMemoryInquiries = [];

// @desc    Submit inquiry / contact message
// @route   POST /api/inquiries
// @access  Public
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message content'
      });
    }

    const inquiryData = {
      name,
      email,
      topic: topic || 'General Product Inquiry',
      message,
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const inquiry = await Inquiry.create(inquiryData);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received by Anchal.',
        data: inquiry
      });
    }

    inquiryData._id = 'mem_' + Date.now();
    inMemoryInquiries.push(inquiryData);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been recorded and received.',
      data: inquiryData
    });
  } catch (error) {
    console.error('Error in createInquiry:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Public/Admin
exports.getInquiries = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: inquiries.length, data: inquiries });
    }

    res.json({ success: true, count: inMemoryInquiries.length, data: inMemoryInquiries });
  } catch (error) {
    console.error('Error in getInquiries:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
