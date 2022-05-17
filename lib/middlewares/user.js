// import {useRouter} from 'next/router'



// module.exports.isLoggedIn = (req, res, next) => {
//     const router = useRouter();
//     if(!req.isAuthenticated()){
//         req.session.returnTo = req.originalUrl;
//         return router.push({
//             pathname: '/users/login',
//             query: {
//                 flashError : 'You must be logged in for that!'
//             }
//         });
//     }
//     next();
// }