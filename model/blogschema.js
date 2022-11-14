import {Schema, models, model} from 'mongoose';


const blogSchema = new Schema({
    title: String,
    image: String,
    description: String,
    createdAt: String
})

const blog = models.blog || model('blog', blogSchema)
export default blog