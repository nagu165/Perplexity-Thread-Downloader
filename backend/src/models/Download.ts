import mongoose, {Schema, Document} from 'mongoose';

export interface DownloadInterface extends Document {
    title: string,
    url: string,
    content: string,
    createdAt: Date,
    userId: string
}

const DownloadSchema: Schema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, default: 'anonymous' }
});

export default mongoose.model<DownloadInterface>('Download', DownloadSchema);