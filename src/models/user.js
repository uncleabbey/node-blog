import { Schema, model } from "mongoose";
import { sign } from "jsonwebtoken";

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// eslint-disable-next-line func-names
userSchema.methods.generateAuthKey = function () {
  const token = sign(
    {
      // eslint-disable-next-line no-underscore-dangle
      _id: this._id,
      isAdmin: this.isAdmin,
    },
    process.env.SEC_KEY,
    { expiresIn: "24h" }
  );
  return token;
};

const User = model("User", userSchema);

export default User;
