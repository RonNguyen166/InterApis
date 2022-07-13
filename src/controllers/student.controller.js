import Student from "../models/student.model.js";
import Class from "../models/class.model.js";
import pick from "../utils/pick.js";
import Parent from "../models/parent.model.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";

const createStudent = catchAsync(async (req, res) => {
  const student = await Student.create(req.body);
  if (req.body.class?.length) {
    req.body.class.forEach(async (el) => {
      const _class = await Class.findByIdAndUpdate(
        el,
        {
          $push: { students: student.id },
        },
        { new: true }
      );
      if (!_class) throw new ApiError(httpStatus.NOT_FOUND, "Class not found");
    });
  }
  if (req.body.parents?.length) {
    req.body.parents.forEach(async (el) => {
      const parent = await Parent.findByIdAndUpdate(
        el,
        {
          $push: { students: student.id },
        },
        { new: true }
      );
      if (!parent) throw new ApiError(httpStatus.NOT_FOUND, "Parent not found");
    });
  }
  return res.status(201).json(student);
});

const getStudents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "age"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const students = await Student.find(filter, options);
  return res.status(200).json(students);
});

const getStudent = catchAsync(async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  return res.status(200).json(student);
});

const updateStudent = catchAsync(async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.studentId,
    req.body,
    {
      new: true,
    }
  );
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  return res.status(200).json(student);
});

const deleteStudent = catchAsync(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  } else {
    if (student.class.length) {
      await Promise.all(
        student.class.map(async (el) => {
          const _class = await Class.findByIdAndUpdate(
            el,
            {
              $pull: { students: student.id },
            },
            { new: true }
          );
          if (!_class) {
            throw new ApiError(httpStatus.NOT_FOUND, "Class not found");
          }
        })
      );
    }
    if (student.parents.length) {
      student.parents.forEach(async (el) => {
        const parent = await Parent.findByIdAndUpdate(el, {
          $pull: { students: student.id },
        });
        if (!parent)
          throw new ApiError(httpStatus.NOT_FOUND, "Parent not found");
      });
    }
  }
  return res.status(200).json({ message: "Deleted successfully" });
});

export { createStudent, getStudents, getStudent, updateStudent, deleteStudent };
