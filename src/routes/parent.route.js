import express from "express";
import * as parentController from "../controllers/parent.controller.js";
import validate from "../middlewares/validate.js";
import {
  createParent,
  getParents,
  getParent,
  updateParent,
  deleteParent,
} from "../validations/parent.validatiton.js";

const router = express.Router();

router
  .route("/")
  .get(validate(getParents), parentController.getParents)
  .post(validate(createParent), parentController.createParent);

router
  .route("/:parentId")
  .get(validate(getParent), parentController.getParent)
  .patch(validate(updateParent), parentController.updateParent)
  .delete(validate(deleteParent), parentController.deleteParent);

export default router;
