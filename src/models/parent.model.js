import mongoose from "mongoose";
const parentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    students: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Students",
      },
    ],
  },
  { timestamps: true }
);

const Parent = mongoose.model("Parent", parentSchema);

export default Parent;
