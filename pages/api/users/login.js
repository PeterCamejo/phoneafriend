import session from '../../../lib/middlewares/session'
import passport from '../../../lib/passport'
import nextCOptions from '../../../lib/nextConnectOptions'
import nc from 'next-connect'

const handler = nc(nextCOptions);

handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());


handler.post(
    passport.authenticate('local'),
    (req, res) => {        
        try{
            res.status(201).json({success: true, data: "Logged in!", user: req.user});
        }catch(e){
            console.log("error with res: " , e);
        }

    }
)

export default handler

