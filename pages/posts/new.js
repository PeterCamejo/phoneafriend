import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'


const NewPost = () =>{
    const router = useRouter();
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
            return router.push({
                                pathname: '/',
                                query:{
                                    flash: data.data
                                }
            });
        }else{
            return setFlashError("An Error has occured");
        }

    }


    return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
        <h1 className='mb-3 text-lg underline'> New Post</h1>
        <div className='container w-full text-center'>
            {flashError ? (
                <h4>{flashError}</h4>
            ) : null}
            {flashSuccess ? (
                <h4>{flashSuccess}</h4>
            ): null}
        </div>
        <div className='container w-1/2'>
            <div className='container'>
                <Link href="/">
                        <button className='p-3 border-solid rounded-md mb-3  border-black border-2'>
                            Go Back    
                        </button>
                </Link>
            </div>
            <div className='container p-3 flex rounded-md border-solid border-2 border-black'>
                <form onSubmit={handlePost} className='w-full '>
                    <div className='mb-3'>
                        <label>Title</label>
                        <input className='border-grey border-solid border-2 w-full'
                            name="title" 
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value = {title}
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Body</label>
                        <textarea className='border-solid border-2 border-gray w-full' 
                                name="body"
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                        ></textarea>
                        
                    </div>
                    <button type="submit" className='p-3 w-1/3 rounded-md border-black border-solid border-2'>
                        Submit
                    </button>
                </form>
            </div>
        </div> 
    </div>
    )
}

export default NewPost