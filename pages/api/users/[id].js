import session from '../../../lib/middlewares/session';
import passport from '../../../lib/passport'
import nextCOptions from '../../../lib/nextConnectOptions'
import nc from 'next-connect'
import {getUserById} from '../../../controllers/users'

const handler = nc(nextCOptions);


handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());

handler.get( async (req,res)=>{
    const {id} = req.query;
    const user = await getUserById(id);
    res.json({user});
})

export default handler