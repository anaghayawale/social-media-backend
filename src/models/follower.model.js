import mongoose, { Schema } from "mongoose";

const followerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

followerSchema.pre("save", function (next) {
  if (this.isNew) {
    this.followers.forEach((follower, index) => {
      this.followers[index] = { userId: this._id, follower };
    });
  }
  next();
});

export const Follower = mongoose.model("Follower", followerSchema);
