const mongoose = require("mongoose");
const Contact = require("../Model/Contact");

const STATUSES = Contact.STATUSES;

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

/* POST /api/contact   (public) */
exports.createContact = async (req, res, next) => {
  try {
    // Honeypot: bots fill hidden fields, real users never see it
    if (req.body.website) {
      return res.status(201).json({ success: true, message: "Enquiry submitted successfully." });
    }

    const { name, email, phone, company, service, enquiry, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      service,
      enquiry,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      data: { id: contact._id.toString() },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors,
      });
    }
    next(err);
  }
};

/* GET /api/contact?search=&status=&page=1&limit=10   (admin) */
exports.getContacts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const search = String(req.query.search || "").trim();
    const status = String(req.query.status || "").trim();

    const filter = {};
    if (STATUSES.includes(status)) filter.status = status;
    if (search) {
      const rx = new RegExp(escapeRegex(search), "i");
      filter.$or = [
        { name: rx },
        { email: rx },
        { phone: rx },
        { company: rx },
        { service: rx },
        { enquiry: rx },
        { message: rx },
      ];
    }

    const [total, newCount, contacts] = await Promise.all([
      Contact.countDocuments(filter),
      Contact.countDocuments({ status: "New" }),
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    res.json({
      success: true,
      data: contacts,
      newCount,
      pagination: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (err) {
    next(err);
  }
};

/* GET /api/contact/:id   (admin) */
exports.getContactById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid enquiry id." });

    const contact = await Contact.findById(req.params.id);
    if (!contact)
      return res.status(404).json({ success: false, message: "Enquiry not found." });

    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

/* PATCH /api/contact/:id/status   (admin) */
exports.updateContactStatus = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid enquiry id." });

    const { status } = req.body;
    if (!STATUSES.includes(status))
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${STATUSES.join(", ")}.`,
      });

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!contact)
      return res.status(404).json({ success: false, message: "Enquiry not found." });

    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/contact/:id   (admin) */
exports.deleteContact = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid enquiry id." });

    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact)
      return res.status(404).json({ success: false, message: "Enquiry not found." });

    res.json({ success: true, message: "Enquiry deleted successfully." });
  } catch (err) {
    next(err);
  }
};