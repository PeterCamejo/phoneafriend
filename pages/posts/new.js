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
        <h1 className='mb-3 underline'> New Post</h1>
        <div className='container'>
            {flashError ? (
                <h4>{flashError}</h4>
            ) : null}
            {flashSuccess ? (
                <h4>{flashSuccess}</h4>
            ): null}
        </div>
        <div className='container'>
            <Link href="/">
                    <button className='p-3 border-solid mb-3  border-black border-2'>
                        Go Back    
                    </button>
            </Link>
        </div>
        <div className='container flex border-solid border-2 border-black justify-center'>
            <form onSubmit={handlePost}>
                <div className='mb-3'>
                    <label>Title</label>
                    <input className='border-grey border-solid border-2'
                        name="title" 
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value = {title}
                    />
                </div>
                <div className='mb-3 flex justify-start'>
                    <label>Body</label>
                    <textarea className='border-solid border-2 border-gray' 
                            name="body"
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                    ></textarea>
                    
                </div>
                <button type="submit" className='p-3 border-black border-solid border-2'>
                    Submit
                </button>
            </form>
        </div>
    </div>
    )
}

export default NewPost