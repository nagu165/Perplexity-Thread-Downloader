import mongoose, { Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
    name: string,
    email: string,
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    name : { type: String, required: true, unique: true},
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now}
});

export default mongoose.model<UserInterface>('user', UserSchema);