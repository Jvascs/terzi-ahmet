import { Schema,model,models } from "mongoose";

const userSchema =  new Schema({
    clerkId: {
        type: String,
        required:true,
        unique: true,
    },
    email: {
        type: String,
        required:true,
        unique: true,
    },
    username: {
        type: String,
        required:true,
        unique: true,
    },
    photo: {
        type: String,
        required:true,
        unique: true,
    },
    firstName: {
        type: String,
        required:true,
        unique: true,
    },
    Lastname: {
        type: String,
        required:true,
        unique: true,
    },
    adress: {
        type: String,
    },
    country: {
        type: String,
    },
    phone: {
        type: String,
    },
    location: {
        type: String,
    },
})

const User = models?.User || model("User",userSchema)
export default User