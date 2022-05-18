import Post from '../../models/Post'

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        return res.json({notLoggedIn: true});
    }
    next();
}

module.exports.isPostAuthor = async (req, res, next) =>{
    const id = JSON.parse(req.body);
    const post = await Post.findById(id);
    
    if(!post.author.equals(req.user._id)){
        return res.json({notAuthor: true});
    }

    next();
}