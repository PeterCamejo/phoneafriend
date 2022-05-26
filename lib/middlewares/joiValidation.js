import {postSchema, commentSchema} from '../../models/joischemas'

module.exports.validatePost = (req, res, next) => {
    const {body, title} = JSON.parse(req.body);
    const {error} = postSchema.validate({post:{
        title,
        body
    }});

    if(error){
        const msg = error.details.map(el => el.message).join(",");
        return res.json({failedValidation: true, error: msg});
        //throw new Error();
    }else{
        next();
    }

}

module.exports.validateComment = (req , res , next) => {
    const {comment} = JSON.parse(req.body);
    const {error} = commentSchema.validate({comment:comment});

    if(error){
        const msg = error.details.map(el => el.message).join(",");
        return res.json({failedValidation: true, error: msg});
        //throw new Error();
    }
    else{
        next();
    }
}