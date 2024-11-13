import mongoose, {Document, Schema} from "mongoose";

interface IMissile extends Document {
    type: string;
    region: 'North' | 'South' | 'Center' | 'East' | 'West';
    interceptionSpeed: number;
    status: 'peding' | 'hit' | 'miss';
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
        enum: ['North', 'South', 'Center', 'East', 'West']
    },
    interceptionSpeed: {
        type: Number,
        required: true
    },    
    status: {
        type: String,
        enum: ['peding', 'hit', 'miss'],
        default: 'peding'
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
