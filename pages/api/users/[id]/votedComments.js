import session from '../../../../lib/middlewares/session';
import passport from '../../../../lib/passport'
import nextCOptions from '../../../../lib/nextConnectOptions'
import nc from 'next-connect'
import catchAsync from '../../../../utils/catchAsync';
import {isLoggedIn} from '../../../../lib/middlewares/user'
import { removeCommentVoteInUser, setCommentVoteInUser } from '../../../../controllers/comments';

const handler = nc(nextCOptions);


handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());

handler.use(isLoggedIn).put(catchAsync(async (req, res)=>{
    await setCommentVoteInUser(req);
    res.status(200).json({success:true, data: 'Vote for this comment saved'});
}));


handler.use(isLoggedIn).delete( catchAsync(async (req,res)=>{
    await removeCommentVoteInUser(req);
    res.status(200).json({success: true, data: "Vote for this comment removed"});
}));

export default handler

