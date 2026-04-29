const Case = require("../models/Case");

exports.createCase = async (req, res) => {
  try {
    const newCase = new Case(req.body);

    await newCase.save();

    res.status(201).json({
      success: true,
      message: "Case created successfully",
      data: newCase,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error creating case",
      error: error.message,
    });
  }
};

exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching cases",
      error: error.message,
    });
  }
};
exports.getCaseById = async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id);

    if (!caseData) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      success: true,
      data: caseData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching case",
      error: error.message,
    });
  }
};