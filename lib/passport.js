import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const User = require('../models/User');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;
