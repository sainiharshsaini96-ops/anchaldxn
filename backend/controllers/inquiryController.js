const { getCollection } = require('../config/db');
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
        message: 'Please provide name, email, and message content',
      });
    }

    const inquiryData = {
      name: name.trim(),
      email: email.trim(),
      topic: topic || 'General Product Inquiry',
      message: message.trim(),
      createdAt: new Date(),
    };

    // 1. Try Native Atlas collection
    const collection = getCollection('inquiries');
    if (collection) {
      const result = await collection.insertOne(inquiryData);
      inquiryData._id = result.insertedId;
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received by Anchal.',
        data: inquiryData,
        source: 'mongodb-atlas',
      });
    }

    // 2. Try Mongoose
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const inquiry = await Inquiry.create(inquiryData);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received by Anchal.',
        data: inquiry,
        source: 'mongodb-mongoose',
      });
    }

    // 3. Fallback to in-memory array
    inquiryData._id = 'mem_' + Date.now();
    inMemoryInquiries.unshift(inquiryData);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been recorded and received.',
      data: inquiryData,
      source: 'in-memory-archive',
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
    // 1. Try Native Atlas collection
    const collection = getCollection('inquiries');
    if (collection) {
      const items = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return res.json({
        success: true,
        count: items.length,
        data: items,
        source: 'mongodb-atlas',
      });
    }

    // 2. Try Mongoose
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: inquiries.length,
        data: inquiries,
        source: 'mongodb-mongoose',
      });
    }

    // 3. In-memory fallback
    res.json({
      success: true,
      count: inMemoryInquiries.length,
      data: inMemoryInquiries,
      source: 'in-memory-archive',
    });
  } catch (error) {
    console.error('Error in getInquiries:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
