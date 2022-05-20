
const Comment = (props) =>{

    const deleteComment = props.deleteComment;

    const handleDelete = async () =>{
        const reqBody = {
            postId: props.postId,
            commentId:props.comment._id
        }

        let response = await fetch(`/api/posts/${props.postId}/comments`, {
            method: 'DELETE',
            body: JSON.stringify(reqBody)
        });
        let data = await response.json();

        if(data){
            deleteComment(props.comment);
        }
        
        return
    }

    return(
        <div className="container shadow-md  inline p-2">
            <button onClick={handleDelete} className="float-right">
                X
            </button>
            <p>{props.comment.body}</p>
            <h4 className="font-medium float-right text-slate-500">Author</h4>
        
        </div>
    )
}

export default Comment