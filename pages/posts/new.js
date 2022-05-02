import {useState} from 'react'
import Link from 'next/link'

const NewPost = () =>{

    const[title ,setTitle] = useState('');
    const[body, setBody] = useState('');
    const[flashError, setFlashError] = useState('');
    const[flashSuccess, setFlashSuccess] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        setFlashError('');
        setFlashSuccess('');

        if(!title || !content){
            setFlashError('All fields are required');
            return;
        }
        
        let newPost = {
            author: 'Me',
            body,
            title
            
        }
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(newPost)
        });
        let data = await response.json();

        if(data){
            setTitle('');
            setBody('');

            return setFlashSuccess(data.data);
        }else{
            return setFlashError("An Error has occured");
        }

    }


    return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className='container'>
            {flashError ? (
                <h4>{flashError}</h4>
            ) : null}
            {flashSuccess ? (
                <h4>{flashSuccess}</h4>
            ): null}
        </div>
        <Link href="/">
                go back
            </Link>
        <form onSubmit={handlePost}>
            <label>Title</label>
            <input name="title" 
                   type="text"
                   onChange={(e) => setTitle(e.target.value)}
                   value = {title}
            />

            <label>Body</label>
            <textarea name="body"
                      onChange={(e) => setBody(e.target.value)}
                      value={body}
            ></textarea>
            <button type="submit" className='p-3'>
                Submit
            </button>
        </form>
    </div>
    )
}

export default NewPost