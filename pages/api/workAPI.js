import connectMongo  from "../../lib/mongodb";
import work from "../../model/work";

export default async function handler(req, res) {
 connectMongo().catch(()=>res.status(405).json({error: 'Error in the Connection'}))
 if (req.method == 'POST') {
  let reqs = JSON.parse(req.body);
  if (!reqs._id) {

    async function postWork(req, res) {
      try {
        const formData = req.body;
        if (!formData) return res.status(404).json({error: 'Data not provided'})
        const newWork = new work(JSON.parse(formData));
        await newWork.save(function(err,data) {
          return res.status(200).json(data);
        })
      }catch (err) {
        return res.status(404).json({error: err})
      }
    }

    postWork(req,res);
  }
  else {
    async function changeWork(req, res) {
      try {
        const formData = JSON.parse(req.body);
        if (!formData) return res.status(404).json({error: 'Data not provided'})
        let newData = {...formData};
        delete newData._id;
        await work.findOneAndUpdate({_id: formData._id}, newData);
        
        
      }catch (err) {
        return res.status(404).json({error: err})
      }
    }
    changeWork(req, res);
  }
 }
 else if (req.method == 'GET') {
  async function getWork(req, res) {
    try {
      work.find({}, (err, work) => {
          if (err) {
            return;
            
          } else {
              if (req.query.page) {
                work = work.splice(req.query.page*7 - 7,req.query.page*7)
              }
              return res.status(200).json({data: work})
              
          }
      });
    }catch (err) {
      return res.status(404).json({error: err})
     
    }
  }
  getWork(req, res);
 }
 else if (req.method == "DELETE") {
  async function deleteWork(req, res) {
    try {

      return work.deleteOne({_id: req.query.id}, function (err) {
        if(err) return res.status(404).json({err:err});
        return res.status(200).json({info: 'Blog deleted'});
      })
    }catch (err) {
      return res.status(404).json({error: err})
    }
  }
  deleteWork(req, res);
 }

}

export const config = {
  api: {
      externalResolver: true
  }
}