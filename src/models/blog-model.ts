import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogSchema extends Document {
    title: String;
    content: String;
    coverImageUrl?: String;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        coverImageUrl: { type: String },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: Date,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Blog = mongoose.model<IBlogSchema>('Blog', BlogSchema);
