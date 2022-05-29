import session from '../../../../lib/middlewares/session';
import passport from '../../../../lib/passport'
import nextCOptions from '../../../../lib/nextConnectOptions'
import nc from 'next-connect'
import catchAsync from '../../../../utils/catchAsync';
import { getUserPosts } from '../../../../controllers/users';

const handler = nc(nextCOptions);


handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());

handler.get(catchAsync(async (req, res)=>{    
    const posts = await getUserPosts(req.query.id);
    res.status(200).json({posts});
}));



export default handler