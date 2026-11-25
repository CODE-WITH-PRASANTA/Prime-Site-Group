const mongoose = require("mongoose");
const ServiceBooking = require("../Model/ServiceBooking");

const STATUSES = ServiceBooking.STATUSES;

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const formatBooking = (doc) => {
  const obj = doc.toJSON ? doc.toJSON() : { ...doc };
  const d = doc.createdAt ? new Date(doc.createdAt) : null;
  return {
    ...obj,
    id: obj.id || (doc._id ? doc._id.toString() : ""),
    date: d ? d.toISOString().slice(0, 10) : "",
    time: d
      ? d.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "",
  };
};

/* POST /api/service-bookings   (public) */
exports.createServiceBooking = async (req, res, next) => {
  try {
    const { name, email, phone, company, service, enquiry, message } = req.body;

    const booking = await ServiceBooking.create({
      name,
      email,
      phone,
      company: company || "",
      service,
      enquiry: enquiry || "General Enquiry",
      message,
    });

    res.status(201).json({
      success: true,
      message: "Service booking submitted successfully.",
      data: formatBooking(booking),
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: Object.values(errors)[0] || "Validation failed.",
        errors,
      });
    }
    next(err);
  }
};

/* GET /api/service-bookings   (admin) */
exports.getServiceBookings = async (req, res, next) => {
  try {
    const isAll = req.query.all === "true";
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = isAll
      ? 0
      : Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const search = String(req.query.search || "").trim();
    const status = String(req.query.status || "").trim();
    const service = String(req.query.service || "").trim();
    const enquiry = String(req.query.enquiry || "").trim();

    const filter = {};
    if (status && STATUSES.includes(status)) filter.status = status;
    if (service) filter.service = service;
    if (enquiry) filter.enquiry = enquiry;
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

    let query = ServiceBooking.find(filter).sort({ createdAt: -1 });
    if (!isAll && limit > 0) {
      query = query.skip((page - 1) * limit).limit(limit);
    }

    const [total, bookings] = await Promise.all([
      ServiceBooking.countDocuments(filter),
      query,
    ]);

    res.json({
      success: true,
      data: bookings.map(formatBooking),
      pagination: {
        total,
        page,
        limit: isAll ? total : limit,
        totalPages:
          isAll || limit === 0 ? 1 : Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (err) {
    next(err);
  }
};

/* GET /api/service-bookings/:id   (admin) */
exports.getServiceBookingById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid booking id." });
    }

    const booking = await ServiceBooking.findById(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Service booking not found." });
    }

    res.json({ success: true, data: formatBooking(booking) });
  } catch (err) {
    next(err);
  }
};

/* PUT /api/service-bookings/:id   (admin) */
exports.updateServiceBooking = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid booking id." });
    }

    const { name, email, phone, company, service, enquiry, status, message } =
      req.body;

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (company !== undefined) updates.company = company;
    if (service !== undefined) updates.service = service;
    if (enquiry !== undefined) updates.enquiry = enquiry;
    if (status !== undefined) updates.status = status;
    if (message !== undefined) updates.message = message;

    const booking = await ServiceBooking.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Service booking not found." });
    }

    res.json({
      success: true,
      message: "Service booking updated successfully.",
      data: formatBooking(booking),
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: Object.values(errors)[0] || "Validation failed.",
        errors,
      });
    }
    next(err);
  }
};

/* PATCH /api/service-bookings/:id/status   (admin) */
exports.updateServiceBookingStatus = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid booking id." });
    }

    const { status } = req.body;
    if (!STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${STATUSES.join(", ")}.`,
      });
    }

    const booking = await ServiceBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Service booking not found." });
    }

    res.json({
      success: true,
      message: "Status updated successfully.",
      data: formatBooking(booking),
    });
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/service-bookings/:id   (admin) */
exports.deleteServiceBooking = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid booking id." });
    }

    const booking = await ServiceBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Service booking not found." });
    }

    res.json({
      success: true,
      message: "Service booking deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};
