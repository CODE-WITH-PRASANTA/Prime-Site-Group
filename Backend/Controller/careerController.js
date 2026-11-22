const mongoose = require("mongoose");
const Career = require("../Model/Career");

const ALLOWED_FIELDS = [
  "title",
  "location",
  "salary",
  "experience",
  "department",
  "type",
  "status",
  "vacancies",
  "description",
];

const pick = (body) =>
  ALLOWED_FIELDS.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

/* GET /api/careers?search=&location=&type=&status=&page=1&limit=5 */
exports.getCareers = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 5));
    const { search = "", location = "", type = "", status = "" } = req.query;

    const filter = {};
    if (location) filter.location = location;
    if (type) filter.type = type;
    if (status) filter.status = status;

    if (search.trim()) {
      const rx = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [
        { title: rx },
        { department: rx },
        { location: rx },
        { salary: rx },
        { experience: rx },
        { type: rx },
        { status: rx },
      ];
    }

    const [total, careers] = await Promise.all([
      Career.countDocuments(filter),
      Career.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    res.json({
      success: true,
      data: careers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (err) {
    next(err);
  }
};

/* GET /api/careers/locations  (for the location filter dropdown) */
exports.getLocations = async (_req, res, next) => {
  try {
    const locations = (await Career.distinct("location")).sort();
    res.json({ success: true, data: locations });
  } catch (err) {
    next(err);
  }
};

/* GET /api/careers/:id */
exports.getCareerById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid career id." });

    const career = await Career.findById(req.params.id);
    if (!career)
      return res.status(404).json({ success: false, message: "Career not found." });

    res.json({ success: true, data: career });
  } catch (err) {
    next(err);
  }
};

/* POST /api/careers */
exports.createCareer = async (req, res, next) => {
  try {
    const career = await Career.create(pick(req.body));
    res.status(201).json({
      success: true,
      message: "Career created successfully",
      data: career,
    });
  } catch (err) {
    next(err);
  }
};

/* PUT /api/careers/:id */
exports.updateCareer = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid career id." });

    const career = await Career.findByIdAndUpdate(req.params.id, pick(req.body), {
      new: true,
      runValidators: true,
    });

    if (!career)
      return res.status(404).json({ success: false, message: "Career not found." });

    res.json({
      success: true,
      message: "Career updated successfully",
      data: career,
    });
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/careers/:id */
exports.deleteCareer = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid career id." });

    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career)
      return res.status(404).json({ success: false, message: "Career not found." });

    res.json({ success: true, message: "Career deleted successfully" });
  } catch (err) {
    next(err);
  }
};