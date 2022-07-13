import express from "express";
import * as classController from "../controllers/class.controller.js";
import validate from "../middlewares/validate.js";
import {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
} from "../validations/class.validation.js";

const router = express.Router();

router
  .route("/")
  .get(validate(getClasses), classController.getClasses)
  .post(validate(createClass), classController.createClass);

router
  .route("/:classId")
  .get(validate(getClass), classController.getClass)
  .patch(validate(updateClass), classController.updateClass)
  .delete(validate(deleteClass), classController.deleteClass);

export default router;
