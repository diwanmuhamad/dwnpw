import connectMongo  from "../../lib/mongodb";
import blog from "../../model/blogschema";

export default async function handler(req, res) {
 connectMongo().catch(()=>res.status(405).json({error: 'Error in the Connection'}))
 if (req.method == 'POST') {
    async function postBlog(req, res) {
      try {
        const formData = req.body;
        if (!formData) return res.status(404).json({error: 'Data not provided'})
        const newBlog = new blog(JSON.parse(formData));
        await newBlog.save(function(err,data) {
          return res.status(200).json(data);
        })
      }catch (err) {
        return res.status(404).json({error: err})
      }
    }

    postBlog(req,res);
 }
 else if (req.method == 'GET') {
  async function getBlog(req, res) {
    try {
      blog.find({}, (err, blog) => {
          if (err) {
            return;
              // return res.status(404).json({error: 'data not found'});
          } else {
              return res.status(200).json({data: blog})
          }
      });
    }catch (err) {
      return res.status(404).json({error: err})
    }
  }
  getBlog(req, res);
 }

}