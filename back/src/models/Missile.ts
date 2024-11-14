// src/models/Missile.ts
import mongoose, {Document, Schema} from "mongoose";

interface IMissile extends Document {
    type: string;
    region: 'North' | 'South' | 'Center' | 'YehudaAndShomron';
    interceptionSpeed: number;
    status: 'pending' | 'hit' | 'miss';
    usedBy: mongoose.Types.ObjectId;
    timeout: Date;
}

const missileSchema = new Schema<IMissile>({
    type: {
        type: String,
        required: true
    },
    region: {
        type: String,        
        enum: ['North', 'South', 'Center', 'YehudaAndShomron']
    },
    interceptionSpeed: {
        type: Number,
        required: true
    },    
    status: {
        type: String,
        enum: ['pending', 'hit', 'miss'],
        default: 'pending'
    },
    usedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timeout: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export default mongoose.model<IMissile>('Missile', missileSchema);
