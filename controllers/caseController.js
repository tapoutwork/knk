const Case = require("../models/Case");

// POST - create case
exports.createCase = async (req, res, next) => {
  try {
    const newCase = new Case(req.body);

    await newCase.save();

    res.status(201).json({
      success: true,
      message: "Case created successfully",
      data: newCase,
    });

  } catch (error) {
    next(error);
  }
};


// GET - all cases with pagination, filtering, search, and Sorting

exports.getAllCases = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Filters
    let filter = {};

    if (req.query.status) {
      filter.check_status = req.query.status;
    }

    if (req.query.search) {
      filter.comp_ref_no = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    // Sorting & How Sorting will work:-
      // sort=createdAt   → ascending (old → new)
     //  sort=-createdAt  → descending (new → old)
     
    let sortBy = "-createdAt"; // default (latest first)

    if (req.query.sort) {
      sortBy = req.query.sort;
    }

    // Total count
    const total = await Case.countDocuments(filter);

    // Fetch data
    const cases = await Case.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      sort: sortBy,
      data: cases,
    });

  } catch (error) {
    next(error);
  }
};

// GET - case by ID
exports.getCaseById = async (req, res, next) => {
  try {
    const caseData = await Case.findById(req.params.id);

    if (!caseData) {
      const error = new Error("Case not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: caseData,
    });

  } catch (error) {
    next(error);
  }
};


// PUT - update full case
exports.updateCase = async (req, res, next) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCase) {
      const error = new Error("Case not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Case updated successfully",
      data: updatedCase,
    });

  } catch (error) {
    next(error);
  }
};


// DELETE - case by ID
exports.deleteCase = async (req, res, next) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);

    if (!deletedCase) {
      const error = new Error("Case not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Case deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};


// PATCH - update only status
exports.updateCaseStatus = async (req, res, next) => {
  try {
    const { check_status } = req.body;

    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      { check_status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCase) {
      const error = new Error("Case not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updatedCase,
    });

  } catch (error) {
    next(error);
  }
};