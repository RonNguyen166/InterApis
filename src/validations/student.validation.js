import Joi from "Joi";
import objectId from "./custom.validation.js";

const createStudent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.boolean().required(),
    class: Joi.array().items(Joi.string().custom(objectId)),
    parents: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getStudents = {
  query: Joi.object().keys({
    name: Joi.string(),
    age: Joi.number(),
    gender: Joi.boolean(),
    class: Joi.string().custom(objectId),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    studentId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    age: Joi.number(),
    gender: Joi.boolean(),
    class: Joi.string().custom(objectId),
    parents: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

const deleteStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

export { createStudent, getStudents, getStudent, updateStudent, deleteStudent };
