import connectMongo  from "../../lib/mongodb";
import blog from "../../model/blogschema";

export default async function handler(req, res) {
 connectMongo().catch(()=>res.status(405).json({error: 'Error in the Connection'}))
 if (req.method == 'POST') {
    let reqs = JSON.parse(req.body)
    if (!reqs._id) {
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
    else {
      async function changeBlog(req, res) {
        try {
          const formData = JSON.parse(req.body);
          if (!formData) return res.status(404).json({error: 'Data not provided'})
          let newData = {...formData};
          delete newData._id;
          await blog.findOneAndUpdate({_id: formData._id}, newData);
          
          
        }catch (err) {
          return res.status(404).json({error: err})
        }
      }
      changeBlog(req, res);
    }
 }
 else if (req.method == 'GET') {
 
  async function getBlog(req, res) {
    try {
      blog.find((req.query.title? {title: req.query.title} : {}), (err, blog) => {
          if (err) {
            return;
              // return res.status(404).json({error: 'data not found'});
          } else {
              if (req.query.page) {
                blog = blog.splice(req.query.page*7 - 7,req.query.page*7)
              }  
              return res.status(200).json({data: blog})
          }
      });
    }catch (err) {
      return res.status(404).json({error: err})
    }
  }
  getBlog(req, res);
 }
 else if (req.method == "DELETE") {
  async function deleteBlog(req, res) {
    try {
      console.log(req.query.id)
      blog.deleteOne({_id: req.query.id}, function (err) {
        if(err) return res.status(404).json({err:err});
        return res.status(200).json({info: 'Blog deleted'});
      })
    }catch (err) {
      return res.status(404).json({error: err})
    }
  }
  deleteBlog(req, res);
 }
 

}

export const config = {
  api: {
      externalResolver: true,
      runtime: 'experimental-edge',
  }
}