import mongoose from 'mongoose'


connectKaro().catch(err => console.log(err));

async function connectKaro() {
  try {
    const storeKaro=await mongoose.connect(`${process.env.MONGODB_URI}/movie`);
    console.log('MongoDB connected successfully');
    
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

export {connectKaro}