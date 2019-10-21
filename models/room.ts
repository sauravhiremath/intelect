import mongoose, { Schema } from "mongoose";
import { Binary } from "crypto";
const schema = mongoose.Schema;

interface roomInterface extends mongoose.Document {
    name: string,
    video: string[],
    notes: string[],
    video_bookmarks: string[],
    topics: string[]
};

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
        type: Array,
        default: []
    },
    notes: {
        type: Array,
        default: []
    },
    video_bookmarks: {
        type: Array,
        default: []
    },
    topics: {
        type: Array,
        default: []
    },
    portionPhoto: {
        data: Buffer, 
        contentType: String
    },
});

interface address {
    houseNo: string,
    village: string,
    zipcode: string
};

interface report {
    age: number,
    sex: string,
    everSmoker: number,
    everDrinker: number,
    sputum: number,
    coughWeeks: number,
    fever: number,
    nightSweats: number,
    weightLoss: number,
    chestPain: number,
    hardBreath: number,
    height: number,
    weight: number
};

export const Patient = mongoose.model<patientInterface>("Patient", patientSchema);
export default Patient;
