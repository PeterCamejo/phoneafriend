import {useState} from 'react'
import NewCommentForm from "./NewCommentForm"
import Comment from "./Comment"




const Comments = (props) =>{
    

    return(
        <div className="w-full flex flex-col justify-center items-center">
            <NewCommentForm postId={props.postId} />
            {props.comments.map((comment, index) => {
                return(
                    <Comment comment={comment} postId={props.postId} key={index} />
                )
            })}
        </div>
    )
}


export default Comments