import { Router } from "express";
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
} from "../controllers/contact.controller.js";
import { contactCreateSchema, contactUpdateSchema, validateBody } from "../middlewares/validate.js";

const router = Router();

router
  .route("/")
  .post(validateBody(contactCreateSchema), createContact)
  .get(getContacts);

router
  .route("/:id")
  .get(getContactById)
  .put(validateBody(contactUpdateSchema), updateContact)
  .delete(deleteContact);

export default router;
