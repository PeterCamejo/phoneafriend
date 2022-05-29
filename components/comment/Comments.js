import {useState,useCallback} from 'react'
import NewCommentForm from "./NewCommentForm"
import Comment from "./Comment"
import { useUser } from '../../lib/hooks'




const Comments = (props) =>{
    const [comments, setComments] = useState(props.comments);
    const [user, {loading}] = useUser();

    //Force an update to fix addComment only triggering one update call,
    //but not updating on successive calls.
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const addComment = (comment) =>{
        comments.unshift(comment);
        setComments(comments);
        forceUpdate();
    }

    const deleteComment = (comment) =>{
        comments = comments.filter(c => c._id != comment._id);
        setComments(comments);
    }

    return(
        <div className="w-full flex flex-col justify-center items-center">
            <h4 className="font-semibold underline self-start mb-3">Comments:</h4>
            {(user || loading) &&
                <NewCommentForm postId={props.postId} 
                                addComment={addComment}
                />
            }
            {!comments.length && <h4 className='mt-3'>No comments yet!</h4>}
            <div className='container border-2 rounded-md border-solid'>
                {comments.map((comment, index) => {
                    return(
                        <Comment comment={comment} 
                                postId={props.postId}
                                deleteComment={deleteComment} 
                                key={index} 
                        />
                    )
                })}
            </div>
        </div>
    )
}


export default Comments