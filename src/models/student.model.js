import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    class: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Class",
      },
    ],
    parents: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Parent",
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
