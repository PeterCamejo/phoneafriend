import {useState} from 'react'
import FlashError from '../flash/FlashError';
import Flash from '../flash/Flash';

const NewCommentForm = (props) =>{

    const [body , setBody] = useState("");
    const [flashError, setFlashError] = useState("");
    const [flashSuccess, setFlashSuccess] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();

        setFlashError("");

        if(!body){
            return setFlashError("Comment can't be empty");
        }

        const newComment = {
            body,
        }

        const reqBody = {
            comment: newComment,
            postId: props.postId
        }


        let response = await fetch(`/api/posts/${props.postId}/comments`, {
            method:'POST',
            body: JSON.stringify(reqBody)
        });

        let data = await response.json();

        if(data){
            setBody("");
            return setFlashSuccess("Comment posted!");
        }else{
            return setFlashError("An Error has occured.");
        }



        return;
    }


    return (
        <div className="container p-3 mb-3 w-full flex flex-row rounded-md border-black border-2 border-solid">
            <h1 className="h-full">Add a comment:</h1>
            <form onSubmit={handleSubmit} className="w-full">
                <textarea className="w-full mb-3 border-solid border-2" 
                          rows={3}
                          name="body"
                          onChange={(e)=>{ setBody(e.target.value)}}
                          value={body} 
                          required>

                </textarea>
                <button className="p-3 rounded-md border-solid border-black border-2" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default NewCommentForm