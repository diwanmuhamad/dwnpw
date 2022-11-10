import {Schema, models, model} from 'mongoose';


const userSchema = new Schema({
    email: String,
    password: String,
    createdAt: String
})

const user = models.user || model('user', userSchema)
export default user