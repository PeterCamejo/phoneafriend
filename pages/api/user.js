import session from '../../lib/middlewares/session';
import passport from '../../lib/passport'
import {nextCOptions} from '../../lib/nextConnectOptions'
import nc from 'next-connect'

const handler = nc(nextCOptions);

handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());

handler.get((req,res)=>{
    res.json({user: req.user});
})

export default handler