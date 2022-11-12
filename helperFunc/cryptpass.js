var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export async function hashpass(pass) {
    return await bcrypt.hash(pass, 10).then(function(has) {
        return has
    });
}

export async function isSamePass(pass, hashpass) {
    return await bcrypt.compare(pass, hashpass).then((res)=> {
        return res;
    })
} 

export function generateAccessToken(username) {
    return jwt.sign(username, process.env.NEXT_PUBLIC_SECRET_KEY, { expiresIn: '1800s' });
  }

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }
