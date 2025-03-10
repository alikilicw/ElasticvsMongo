import mongoose from 'mongoose'
import { Constants } from './constants'

const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(Constants.DB_URL)
        console.log('Successfully connected to the database.')
    } catch (error) {
        console.log(`An error occurred while connecting to the database: ${error}`)
    }
}

export default connectToDatabase
