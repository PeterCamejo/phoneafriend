import session from '../../../lib/middlewares/session';
import passport from '../../../lib/passport'
import nextCOptions from '../../../lib/nextConnectOptions'
import nc from 'next-connect'
import {isLoggedIn} from '../../../lib/middlewares/user'
import catchAsync from '../../../utils/catchAsync'
import { decrementCommentRating } from '../../../controllers/comments';

const handler = nc(nextCOptions);

handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());

handler.use(isLoggedIn).put(catchAsync( async (req, res) =>{
    await decrementCommentRating(req);
    res.status(200).json({success: true, data: 'decrement rating'});
}))

export default handler