const Case = require("../models/Case");

// POST - create case
exports.createCase = async (req, res, next) => {
  console.log("CREATE CASE HIT");
  try {
      const newCase = await Case.create({
      ...req.body,
      user: req.user._id   // 🔥 logged-in user
    });

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

  console.log(req.user);
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Filters
    let filter = {};

    // If user is NOT admin → only own cases
    if (req.user.role !== "admin") {
      filter.user = req.user._id;
    }

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
    .populate("user", "email role")
    .populate("assignedTo", "email role")
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
    const caseData = await Case.findOne({
    _id: req.params.id,
    user: req.user._id
  });

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
    const updatedCase = await Case.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
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
      const deletedCase = await Case.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

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

    const updatedCase = await Case.findOneAndUpdate(
  { _id: req.params.id, user: req.user._id },
  { check_status },
  { new: true, runValidators: true }
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

// 
exports.assignCase = async (req, res, next) => {
  try {
    const { assignedTo } = req.body;

    if (!assignedTo) {
      const error = new Error("assignedTo is required");
      error.statusCode = 400;
      return next(error);
    }

    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      { new: true }
    ).populate("assignedTo", "email role");

    if (!updatedCase) {
      const error = new Error("Case not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Case assigned successfully",
      data: updatedCase
    });

  } catch (error) {
    next(error);
  }
};

// DASHBOARD STATS
exports.getDashboardStats = async (req, res, next) => {
  try {

    const totalCases = await Case.countDocuments();

    const newCases = await Case.countDocuments({
      check_status: "NEW"
    });

    const inProgressCases = await Case.countDocuments({
      check_status: "IN_PROGRESS"
    });

    const doneCases = await Case.countDocuments({
      check_status: "DONE"
    });

    const rejectedCases = await Case.countDocuments({
      check_status: "REJECTED"
    });

    res.status(200).json({
      success: true,
      data: {
        totalCases,
        newCases,
        inProgressCases,
        doneCases,
        rejectedCases
      }
    });

  } catch (error) {
    next(error);
  }
};