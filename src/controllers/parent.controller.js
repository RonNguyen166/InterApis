import httpStatus from "http-status";
import Parent from "../models/parent.model.js";
import Student from "../models/student.model.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import pick from "../utils/pick.js";

const createParent = catchAsync(async (req, res) => {
  const parent = await Parent.create(req.body);
  if (req.body.students?.length) {
    await Promise.all(
      req.body.students.map(async (el) => {
        const student = await Student.findByIdAndUpdate(
          el,
          {
            $push: { parents: parent.id },
          },
          { new: true }
        );
        if (!student)
          throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
      })
    );
  }
  return res.status(201).json(parent);
});

const getParents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const parents = await Parent.find(filter);
  return res.status(200).json(parents);
});

const getParent = catchAsync(async (req, res) => {
  const parent = await Parent.findById(req.params.parentId);
  if (!parent) {
    throw new ApiError(httpStatus.NOT_FOUND, "Parent not found");
  }
  return res.status(200).json(parent);
});

const updateParent = catchAsync(async (req, res) => {
  const parent = await Parent.findByIdAndUpdate(req.params.parentId, req.body, {
    new: true,
  });
  if (!parent) {
    throw new ApiError(httpStatus.NOT_FOUND, "Parent not found");
  }
  return res.status(200).json(parent);
});

const deleteParent = catchAsync(async (req, res) => {
  const parent = await Parent.findByIdAndDelete(req.params.parentId);
  if (!parent) {
    throw new ApiError(httpStatus.NOT_FOUND, "Parent not found");
  } else {
    if (parent.students?.length) {
      await Promise.all(
        parent.students.map(async (el) => {
          const student = await Student.findByIdAndUpdate(
            el,
            {
              $pull: { parents: parent.id },
            },
            { new: true }
          );
          if (!student)
            throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
        })
      );
    }
  }
  return res.status(204).json();
});

export { createParent, getParents, getParent, updateParent, deleteParent };
