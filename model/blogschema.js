import {Schema, models, model} from 'mongoose';


const blogSchema = new Schema({
    title: String,
    image: String,
    view: Number,
    description: String,
    createdAt: String
})

let blog = models.blog || model('blog', blogSchema)
export default blog