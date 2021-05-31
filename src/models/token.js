const { Schema, model } = require("mongoose");

const authTokenSch = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["verify", "forgot"],
  },
  expireAt: {
    type: Date,
    default: () => {
      return new Date(new Date().valueOf() + 3600000);
    },
  },
});
authTokenSch.index({ expireAt: 60 }, { expireAfterSeconds: 0 });
const AuthToken = model("AuthToken", authTokenSch);
export default AuthToken;
