import session from '../../../lib/middlewares/session'
import passport from '../../../lib/passport'
import {nextCOptions} from '../../../lib/nextConnectOptions'
import catchAsync from '../../../utils/catchAsync';
import nc from 'next-connect'
import connectDB from '../../../lib/mongodb';

const User = require('../../../models/User');
const handler = nc(nextCOptions);

handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());

(async () =>{
    try{
        await connectDB();
        return
    }catch(e){
        console.log("Error connecting DB for login", e);
    }
    return
}
)

handler.post(
    passport.authenticate('local'),
    (req, res) => {        
        try{
            res.status(201).json({success: true, data: "Logged in!"});
        }catch(e){
            console.log("error with res: " , e);
        }

    }
)

export default handler

