import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema ({
    firstname: { type: String, require: true, max: 100 },
    lastname: { type: String, require: true, max: 100 },
    email: { type: String, require: true, max: 100 },
    admin: {type: Boolean, default: false },
    age: { type: Number, require: true }
},
{ timestamps: true }
);

export const UserModel = mongoose.mode ( userCollection, userSchema);

