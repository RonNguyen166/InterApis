import Joi from "Joi";
import objectId from "./custom.validation.js";

const createClass = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    numOfStudent: Joi.number().required(),
    students: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getClasses = {
  query: Joi.object().keys({
    name: Joi.string(),
    numOfStudent: Joi.number(),
    students: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const updateClass = {
  params: Joi.object().keys({
    classId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    numOfStudent: Joi.number(),
    students: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getClass = {
  params: Joi.object().keys({
    classId: Joi.string().custom(objectId),
  }),
};

const deleteClass = {
  params: Joi.object().keys({
    classId: Joi.string().custom(objectId),
  }),
};

export { createClass, getClasses, getClass, updateClass, deleteClass };
