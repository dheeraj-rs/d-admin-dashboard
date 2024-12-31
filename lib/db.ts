import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

declare global {
    var mongoose:
        | {
              conn: any;
              promise: any;
          }
        | undefined;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached && cached.conn) {
        return cached.conn;
    }

    if (cached && !cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        if (!cached) {
            throw new Error('Cached connection is undefined');
        }
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (e) {
        if (cached) {
            cached.promise = null;
        }
        console.error('MongoDB connection error:', e);
        throw e;
    }
};

export default connectDB;
