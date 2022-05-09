import {useState,useCallback} from 'react'
import NewCommentForm from "./NewCommentForm"
import Comment from "./Comment"




const Comments = (props) =>{
    const [comments, setComments] = useState(props.comments);
    const setPageFlash = props.setPageFlash;

    //Force an update to fix addComment only triggering one update call,
    //but not updating on successive calls.
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const addComment = (comment) =>{
        comments.push(comment);
        setComments(comments);
        forceUpdate();
    }

    const deleteComment = (comment) =>{
        comments = comments.filter(c => c._id != comment._id);
        setComments(comments);
    }

    return(
        <div className="w-full flex flex-col justify-center items-center">
            <NewCommentForm postId={props.postId} 
                            setPageFlash={setPageFlash}
                            addComment={addComment}
            />
            {comments.map((comment, index) => {
                return(
                    <Comment comment={comment} 
                             setPageFlash={setPageFlash} 
                             postId={props.postId}
                             deleteComment={deleteComment} 
                             key={index} 
                    />
                )
            })}
        </div>
    )
}


export default Comments