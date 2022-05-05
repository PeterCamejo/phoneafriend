import {useState} from 'react'

const NewCommentForm = () =>{

    const [body , setBody] = useState("");
    
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!body){
            //FlashError = Comment cant' be empty
        }


        return;
    }


    return (
        <div className="container p-3 w-full flex flex-row rounded-md border-black border-2 border-solid">
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