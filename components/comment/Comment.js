import {useRouter} from 'next/router'
import {useState} from 'react'


const Comment = (props) =>{
    const router = useRouter();
    const [flashSuccess, setFlashSuccess] = useState("");
    const [flashError, setFlashError] = useState("");

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
            router.push({
                pathname:`/posts/${props.postId}`,
                query: { flash : data.data,
                         postId : props.postId 
                       }, 
            })
        }else{
            return setFlashError("Error occured");
        }

        return
    }

    return(
        <div className="container shadow-lg  inline p-2">
            <p>{props.comment.body}</p>
            <div className="float-right">
                <button onClick={handleDelete}>
                    X
                </button>
                <h4 className="font-medium text-slate-500">Author</h4>
            </div>
        </div>
    )
}

export default Comment