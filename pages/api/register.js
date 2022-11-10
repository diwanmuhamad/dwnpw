import connectMongo  from "../../lib/mongodb";
import user from "../../model/user";
import { isSamePass } from "../../helperFunc/cryptpass";

export default async function handler(req, res) {
 connectMongo().catch(()=>res.status(405).json({error: 'Error in the Connection'}))
 if (req.method == 'POST') {
    async function postUser(req, res) {
      try {
        const formData = req.body;
        if (!formData) return res.status(404).json({error: 'Data not provided'})
        const newUser = new user(JSON.parse(formData));
        await newUser.save(function(err,data) {
          return res.status(200).json(data);
        })
      }catch (err) {
        return res.status(404).json({error: err})
      }
    }

    postUser(req,res);
 }
 else if (req.method == "GET") {
    async function getUser(req, res) {
        try {
            if (req.query.email) {

                user.find({email:  req.query.email}, (err, users) => {
                    if (err || users.length == 0) {
                        return res.status(404).json({error: "User not found"})
                    } else if (users.length > 0){
                        console.log(users)
                        isSamePass(req.query.password, users[0].password)
                        .then((result) => {
                            if (result) {
                                return res.status(200).json({info: 'login success'});
                            }
                            else {
                                return res.status(404).json({error: 'wrong password'});
                            }
                        })
                    }
                })
            }            
          
        }catch (err) {
            return res.status(404).json({error: err})
        }
    }

    getUser(req, res);
 }
}