import {Schema, models, model} from 'mongoose';


const messageSchema = new Schema({
    names: String,
    email: String,
    message: String,
    createdAt: String
})

const message = models.message || model('message', messageSchema)
export default message