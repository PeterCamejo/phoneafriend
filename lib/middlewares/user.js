import Post from '../../models/Post'
import Comment from '../../models/Comment'

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

module.exports.isCommentAuthor = async (req, res, next) =>{
        const body = JSON.parse(req.body);
        const comment = await Comment.findById(body.commentId);

        if(!comment.author.equals(req.user._id)){;
            return res.json({notAuthor:true});
        }

        next();
}