import {useState} from 'react'
import NewCommentForm from "./NewCommentForm"



const Comments = (props) =>{
    
    const [comments , setComments] = useState(props.comments);

    return(
        <div className="w-full flex flex-col justify-center items-center">
            <NewCommentForm postId={props.postId} />
            {props.comments && props.comments.map((comment, index) => {
                return(
                    <Comment comment={comment} key={index} />
                )
            })}
        </div>
    )
}

export default Comments