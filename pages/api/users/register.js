import session from '../../../lib/middlewares/session'
import passport from '../../../lib/passport'
import nextCOptions from '../../../lib/nextConnectOptions'
import catchAsync from '../../../utils/catchAsync';
import nc from 'next-connect'


const User = require('../../../models/User');
const handler = nc(nextCOptions);

handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());



handler.post(
        catchAsync(
            async(req,res)=>{
                // await connectDB();
                let{username, email, password} = JSON.parse(req.body);
                const user = new User({email,username});
                const registeredUser = await User.register(user,password, function(err) {
                    if (err) {
                      console.log('Error while registering: ', err);
                      return;
                    }});

                res.status(201).json({success: true, data: "Successfully registered!"})
            }
        )
    
    )

    export default handler;