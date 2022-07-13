import express from "express";
import * as studentController from "../controllers/student.controller.js";
import validate from "../middlewares/validate.js";
import {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../validations/student.validation.js";

const router = express.Router();

router
  .route("/")
  .get(validate(getStudents), studentController.getStudents)
  .post(validate(createStudent), studentController.createStudent);

router
  .route("/:studentId")
  .get(validate(getStudent), studentController.getStudent)
  .patch(validate(updateStudent), studentController.updateStudent)
  .delete(validate(deleteStudent), studentController.deleteStudent);

export default router;
