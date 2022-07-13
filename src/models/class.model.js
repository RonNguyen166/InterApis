import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    numOfStudent: {
      type: Number,
      required: true,
    },
    students: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
