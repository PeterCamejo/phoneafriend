import session from '../../../lib/middlewares/session';
import passport from '../../../lib/passport'
import nextCOptions from '../../../lib/nextConnectOptions'
import nc from 'next-connect'
import {isLoggedIn} from '../../../lib/middlewares/user'
import catchAsync from '../../../utils/catchAsync'
import { incrementCommentRating, decrementCommentRating} from '../../../controllers/comments';

const handler = nc(nextCOptions);

handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());

handler.use(isLoggedIn).post(catchAsync(async (req, res)=>{
    await incrementCommentRating(req);
    res.status(200).json({success: true, data: 'Comment rating incremented'});
}));

handler.use(isLoggedIn).delete(catchAsync( async (req, res) =>{
    await decrementCommentRating(req);
    res.status(200).json({success: true, data: 'Comment rating decremented'});
}))



export default handler