import mongoose, { Document, Schema, Model } from 'mongoose'

interface ITestDocument extends Document {
    _id: mongoose.Types.ObjectId
    username: string
    description: string
    tags: string[]
    views: number
    userId: string
    createdAt: Date
    updatedAt: Date
}

const TestDocumentSchema = new Schema<ITestDocument>(
    {
        username: { type: String, required: true, index: 'text' },
        description: { type: String, required: true, index: 'text' },
        tags: { type: [String], index: true },
        createdAt: { type: Date, default: Date.now, index: true },
        views: { type: Number, default: 0, index: true }
    },
    { timestamps: true, versionKey: false }
)

const TestDocument: Model<ITestDocument> = mongoose.model('test-document', TestDocumentSchema)

export { TestDocument, ITestDocument }
