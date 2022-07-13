import Class from "../models/class.model.js";
import Student from "../models/student.model.js";
import ApiError from "../utils/ApiError.js";
import pick from "../utils/pick.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";

const createClass = catchAsync(async (req, res) => {
  const _class = await Class.create(req.body);
  if (req.body.students?.length) {
    await Promise.all(
      req.body.students.map(async (el) => {
        const student = await Student.findByIdAndUpdate(
          el,
          {
            $push: { class: _class.id },
          },
          { new: true }
        );
        if (!student)
          throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
      })
    );
  }
  return res.status(201).json(_class);
});

const getClasses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const classes = await Class.find(filter);
  return res.status(200).json(classes);
});

const getClass = catchAsync(async (req, res) => {
  const _class = await Class.findById(req.params.classId);
  if (!_class) {
    throw new ApiError(httpStatus.NOT_FOUND, "Class not found");
  }
  return res.status(200).json(_class);
});

const updateClass = catchAsync(async (req, res) => {
  const _class = await Class.findByIdAndUpdate(req.params.classId, req.body, {
    new: true,
  });
  if (!_class) {
    throw new ApiError(httpStatus.NOT_FOUND, "Class not found");
  }
  return res.status(200).json(_class);
});

const deleteClass = catchAsync(async (req, res) => {
  const _class = await Class.findByIdAndDelete(req.params.classId);
  if (!_class) {
    throw new ApiError(httpStatus.NOT_FOUND, "Class not found");
  }
  if (_class.students.length) {
    await Promise.all(
      _class.students.map(async (el) => {
        const student = await Student.findByIdAndUpdate(
          el,
          {
            $pull: { class: _class.id },
          },
          { new: true }
        );
        if (!student)
          throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
      })
    );
  }
  return res.status(204).json({});
});

export { createClass, getClasses, getClass, updateClass, deleteClass };
