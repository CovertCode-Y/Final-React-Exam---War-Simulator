// src / modules / User
import mongoose , {Document , Schema} from "mongoose";

export interface IUser extends Document{
    username: string;
    password: string;
    organization: 'IDF' | 'Hezbollah' | 'Hamas' | 'Iran';
    role:'defender' | 'attack' ;
    region?: 'North' | 'South' | 'Center' | 'YehudaAndShomron';
    allowRegion?: 'North' | 'South' | 'Center' | 'YehudaAndShomron';
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true,
        enum: ['IDF', 'Hezbollah', 'Hamas', 'Iran']
    },
    role: {
        type: String,
        required: true,
        enum: ['defender', 'attack']
    },
    region: {
        type: String,
        enum: ['North', 'South', 'Center', 'YehudaAndShomron']
    },
    allowRegion: {
        type: [String],
        enum: ['North', 'South', 'Center', 'YehudaAndShomron']
    }
});

export default mongoose.model<IUser>('User', UserSchema);