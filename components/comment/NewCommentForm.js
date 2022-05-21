import {useState} from 'react'
import {useRouter} from 'next/router'

const NewCommentForm = (props) =>{

    const [body , setBody] = useState("");
    const router = useRouter();

    const setPageFlash = props.setPageFlash;
    const addComment = props.addComment

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!body){
            return setPageFlash("Comment can't be empty", true);
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
            //failed isLoggedIn middleware
            if(data.notLoggedIn){
                return router.push({    
                    pathname: `/users/login`,
                    query: {
                        flashError : 'Need to be logged in for that'
                    }
                })
            }
            //failed isPostAuthor middleware
            // if(data.notAuthor){
            //     return router.push({    
            //         pathname: '/',
            //         query: {
            //             flashError : 'You are not the author.'
            //         }
            //     })
            // }

            setBody("");
            addComment(data.data);
        }

        return;
    }


    return (
        <div className="container p-3 mb-3 w-full flex flex-row rounded-md bg-pafTeal border-slate-300 border-2 border-solid">
            <h1 className="h-full">Add a comment:</h1>
            <form onSubmit={handleSubmit} className="w-full">
                <textarea className="w-full mb-3 border-solid border-2" 
                          rows={3}
                          name="body"
                          onChange={(e)=>{ setBody(e.target.value)}}
                          value={body} 
                          required>

                </textarea>
                <button className="p-3 bg-pafGreen rounded-md" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default NewCommentForm