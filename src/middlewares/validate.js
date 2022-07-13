import Joi from "joi";
import pick from "../utils/pick.js";

export default (schema) => (req, res, next) => {
  const validSchem = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchem));

  const { value, error } = Joi.compile(validSchem)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return res.status(400).json({ message: errorMessage });
  }
  Object.assign(req, value);
  return next();
};
