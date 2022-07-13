import Joi from "Joi";
import objectId from "./custom.validation.js";

const createParent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.boolean().required(),
    students: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getParents = {
  query: Joi.object().keys({
    name: Joi.string(),
    age: Joi.number(),
    gender: Joi.boolean(),
  }),
};

const getParent = {
  params: Joi.object().keys({
    parentId: Joi.string().custom(objectId),
  }),
};

const updateParent = {
  params: Joi.object().keys({
    parentId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    age: Joi.number(),
    gender: Joi.boolean(),
    students: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const deleteParent = {
  params: Joi.object().keys({
    parentId: Joi.string().custom(objectId),
  }),
};

export { createParent, getParents, getParent, updateParent, deleteParent };
