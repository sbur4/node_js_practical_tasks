import mongoose from 'mongoose'
;
export async function connect(): Promise<void> {
    const { MONGO_URI } = process.env;

    if (!MONGO_URI) {
        console.log('Please provide DataBase URI to connect. exiting now...');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI).then(() => console.log('Connected to MongoDB!'));
        console.log('Successfully connected to database');
    } catch (e) {
        console.log('DataBase connection failed. exiting now...');
        console.error(e);
        process.exit(1);
    }
}