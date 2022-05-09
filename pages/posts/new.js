import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Flash from '../../components/flash/Flash'
import FlashError from '../../components/flash/FlashError'
import {FiArrowLeft} from 'react-icons/fi'


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
            return setFlashError('All fields are required');
            
        }
        
        let newPost = {
            author: 'Me',
            body,
            title,
            
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

        <div className='container w-1/2'>
            <Flash body={flashSuccess} />
            {flashError && <FlashError body={flashError} />}
            <div className='container'>
                <Link href="/">
                    <button className="p-2 mb-3 text-2xl border-solid bg-pafGreen rounded-md border-black border-2">
                        <FiArrowLeft />
                    </button>
                </Link>
            </div>
            <div className='container p-3 flex rounded-md border-solid border-2 border-black'>
                <form onSubmit={handlePost} className='w-full '>
                    <div className='mb-3'>
                        <label>Title</label>
                        <input className='border-grey border-solid border-2 w-full p-2'
                            name="title" 
                            type="text"
                            onChange={(e) => {setTitle(e.target.value), setFlashError("")}}
                            value = {title}
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Body</label>
                        <textarea className='border-solid border-2 border-gray w-full p-2' 
                                name="body"
                                onChange={(e) => {setBody(e.target.value), setFlashError("")}}
                                value={body}
                        ></textarea>
                        
                    </div>
                    <button type="submit" className='p-3 rounded-md cursor-pointer border-black border-solid border-2'>
                        Submit
                    </button>
                </form>
            </div>
        </div> 
    </div>
    )
}

export default NewPost