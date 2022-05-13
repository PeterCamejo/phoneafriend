import session from '../../../lib/middlewares/session'
import passport from '../../../lib/passport'
import {nextCOptions} from '../../../lib/nextConnectOptions'
import catchAsync from '../../../utils/catchAsync';
import nc from 'next-connect'
import connectDB from '../../../lib/mongodb';

const handler = nc(nextCOptions);

handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());

handler.post((req,res)=>{
    req.logout();
    res.status(200).json({success:true, data: 'Logged out!'});
})

export default handler