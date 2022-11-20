import connectMongo  from "../../lib/mongodb";
import message from "../../model/message";

export default async function handler(req, res) {
 connectMongo().catch(()=>res.status(405).json({error: 'Error in the Connection'}))
 if (req.method == 'POST') {
    async function postMessage(req, res) {
      try {
        const formData = req.body;
        if (!formData) return res.status(404).json({error: 'Data not provided'})
        const newMessage = new message(JSON.parse(formData));
        await newMessage.save(function(err,data) {
          return res.status(200).json(data);
        })
      }catch (err) {
        return res.status(404).json({error: err})
      }
    }

    postMessage(req,res);
 }
 else if (req.method == 'GET') {
  async function getMessage(req, res) {
    try {
      message.find({}, (err, message) => {
          if (err) {
              return res.status(404).json({error: 'data not found'});
          } else {
              message = message.splice(req.query.page*7 - 7,req.query.page*7)
              return res.status(200).json({data: message})
          }
      });
    }catch (err) {
      return res.status(404).json({error: err})
    }
  }
  getMessage(req, res);
 }
}

export const config = {
  api: {
      externalResolver: true
  }
}