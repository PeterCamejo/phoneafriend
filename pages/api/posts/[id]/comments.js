import session from '../../../../lib/middlewares/session';
import passport from '../../../../lib/passport'
import nextCOptions from '../../../../lib/nextConnectOptions'
import nc from 'next-connect'
import {isLoggedIn, isCommentAuthor} from '../../../../lib/middlewares/user'
import catchAsync from '../../../../utils/catchAsync'
import { createComment, deleteComment } from '../../../../controllers/comments';

const handler = nc(nextCOptions);

handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());

handler.use(isLoggedIn).post( catchAsync( async (req ,res )=>{
    const newComment = await createComment(req);
    res.status(200).json({success : true, data: newComment});
})
)

handler.use(isLoggedIn).use(isCommentAuthor).delete( catchAsync(async(req,res)=>{
    await deleteComment(req);
    res.status(200).json({success: true, data: 'Comment deleted'});
})
)

export default handler

