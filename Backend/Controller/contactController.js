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

    const {
      name,
      email,
      phone,
      company,
      service,
      enquiry,
      type,
      message,
      requirement,
    } = req.body;

    const finalMessage = (message || requirement || "Interested in services").trim();
    const finalEnquiry = (enquiry || type || (service ? "Construction Enquiry" : "General Enquiry")).trim();

    const contact = await Contact.create({
      name,
      email,
      phone,
      company: company || "",
      service: service || "",
      enquiry: finalEnquiry,
      message: finalMessage,
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
    const isAll = req.query.all === "true";
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = isAll ? 0 : Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const search = String(req.query.search || "").trim();
    const status = String(req.query.status || "").trim();
    const type = String(req.query.type || "").trim();

    const filter = {};
    if (status && STATUSES.includes(status)) filter.status = status;
    if (type) filter.enquiry = type;
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

    let query = Contact.find(filter).sort({ createdAt: -1 });
    if (!isAll && limit > 0) {
      query = query.skip((page - 1) * limit).limit(limit);
    }

    const [total, newCount, contacts] = await Promise.all([
      Contact.countDocuments(filter),
      Contact.countDocuments({ status: "New" }),
      query,
    ]);

    const formatted = contacts.map((c) => {
      const d = c.createdAt ? new Date(c.createdAt) : null;
      return {
        id: c._id.toString(),
        name: c.name,
        email: c.email,
        phone: c.phone || "",
        company: c.company || "",
        service: c.service || "",
        enquiry: c.enquiry || "General Enquiry",
        type: c.enquiry || "General Enquiry",
        message: c.message,
        status: c.status || "New",
        createdAt: c.createdAt,
        date: d
          ? d.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "",
        time: d
          ? d.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "",
      };
    });

    res.json({
      success: true,
      data: formatted,
      newCount,
      pagination: {
        total,
        page,
        limit: isAll ? total : limit,
        totalPages: isAll || limit === 0 ? 1 : Math.max(1, Math.ceil(total / limit)),
      },
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

/* PUT /api/contact/:id   (admin) */
exports.updateContact = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid enquiry id." });

    const updates = { ...req.body };
    if (updates.type && !updates.enquiry) {
      updates.enquiry = updates.type;
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!contact)
      return res.status(404).json({ success: false, message: "Enquiry not found." });

    res.json({ success: true, message: "Enquiry updated successfully.", data: contact });
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