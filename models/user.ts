import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

export interface userInterface extends mongoose.Document {
    name: string,
    username: string,
    password: string,
    rooms: string[]
}  

export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    rooms: {
        type: String
    }
});

export const User = mongoose.model<userInterface>("User", userSchema);
export default User;
