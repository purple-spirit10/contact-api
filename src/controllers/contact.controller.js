import { Contact } from "../models/Contact.js";

// Helpers for pagination
function getPagination(query) {
  const page = Math.max(parseInt(query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit || "20", 10), 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ status: "success", data: contact });
  } catch (err) {
    next(err);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const { q } = req.query;
    const { limit, skip, page } = getPagination(req.query);

    let filter = {};
    if (q && q.trim()) {
      filter = { $text: { $search: q.trim() } };
    }

    const [items, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(filter)
    ]);

    res.json({
      status: "success",
      meta: { page, limit, total, pages: Math.ceil(total / limit) },
      data: items
    });
  } catch (err) {
    next(err);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ status: "fail", message: "Contact not found" });
    res.json({ status: "success", data: contact });
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!contact) return res.status(404).json({ status: "fail", message: "Contact not found" });
    res.json({ status: "success", data: contact });
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ status: "fail", message: "Contact not found" });
    res.json({ status: "success", message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
};
