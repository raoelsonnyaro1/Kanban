// const { User } = require('../models/user');
import {User} from '@models/user.js'

const handleConnectionAttempts = (req, res, next)=>{
  let user = await User.findOne({'username': req.body.username});
  if(user && user.connexionAttempts >= 5)
    return res.status(403).send('Too any connexion attempts.')

  next();
}

export default handleConnectionAttempts