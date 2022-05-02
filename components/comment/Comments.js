import Comment from "./Comment"
import posts from "../../public/posts"

const Comments = (props) =>{
    
    const currentPost = posts.find(post => post.id == props.id)

    return(
        <div className="w-3/4 flex flex-col justify-center items-center border-solid border-2 border-black">
            {currentPost.comments.map((comment, index) =>{
                return(
                    <Comment author={comment.author} body={comment.body} />
                )
            })}
        </div>
    )
}

export default Comments