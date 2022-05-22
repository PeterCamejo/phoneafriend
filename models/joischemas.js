import Joi from 'joi'

module.exports.postSchema = Joi.object({
    post: Joi.object({
        title: Joi.string().required(),
        body: Joi.string.required(),

    }).required()
})

module.exports.commentSchema = Joi.object({
    commnet: Joi.object({
        body: Joi.string.required()
    }).required()
})