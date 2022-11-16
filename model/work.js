import {Schema, models, model} from 'mongoose';


const workSchema = new Schema({
    title: String,
    image: String,
    description: String,
    url: String,
    createdAt: String
})

const work = models.work || model('work', workSchema)
export default work