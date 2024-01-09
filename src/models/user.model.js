import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      password: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(v);
          },
          message: (props) =>
            "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter and one number",
        },
      },
    },
    followers:[{
        type: Schema.Types.ObjectId,
        ref: "Follower",
    }],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    refreshToken: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,

        
        }, process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY, }
    );
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        }, process.env.REFRESH_TOKEN_SECRET, 
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY, }
    );
}






// populate followers and posts in userSchema

// userSchema.pre("find", function (next) {
//     this.populate("followers").populate("posts");
//     next();
//     });



export const User = mongoose.model("User", userSchema);
