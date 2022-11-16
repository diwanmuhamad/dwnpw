import connectMongo  from "../../lib/mongodb";
import work from "../../model/work";

export default async function handler(req, res) {
 connectMongo().catch(()=>res.status(405).json({error: 'Error in the Connection'}))
 if (req.method == 'POST') {
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
 else if (req.method == 'GET') {
  async function getWork(req, res) {
    try {
      work.find({}, (err, blog) => {
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
  getWork(req, res);
 }

}