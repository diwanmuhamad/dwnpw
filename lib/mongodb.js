import mongoose from 'mongoose';

const connectMongo = async() => {
    try {
        const {connection} = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI)
        if (connection.readyState == 1){
            console.log('database connected')
        }
    }catch(err) {
        return Promise.reject(err)
    }
}

export default connectMongo;