import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Flash from '../../components/flash/Flash'
import FlashError from '../../components/flash/FlashError'
import {FiArrowLeft} from 'react-icons/fi'
import {useUser} from '../../lib/hooks'
import { useEffect } from 'react'
import connectDB from '../../lib/mongodb'


const NewPost = (props) =>{
    const router = useRouter();
    const[title ,setTitle] = useState('');
    const[body, setBody] = useState('');
    const[flashError, setFlashError] = useState('');
    const[flashSuccess, setFlashSuccess] = useState('');
    const[user, {loading}] = useUser();

    

    useEffect(()=>{
        if(!loading && !user){
            router.replace({
                pathname:'/users/login',
                query:{
                    flashError:'Need to login for that!'
                }
        });
        }
    }, [user, loading]);


    const handlePost = async (e) => {
        e.preventDefault();
        setFlashError('');
        setFlashSuccess('');

        if(!title || !content){
            return setFlashError('All fields are required');
            
        }
        
        let newPost = {
            author: user._id,
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
        <h1 className='mb-3 text-3xl underline'> New Post</h1>

        <div className='container w-3/4'>
            <Flash body={flashSuccess} />
            {flashError && <FlashError body={flashError} />}
            <div className='container p-3 flex rounded-md border-solid border-2'>
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
                    <button type="submit" className='p-3 rounded-md cursor-pointer bg-pafGreen'>
                        Submit
                    </button>
                </form>
            </div>
        </div> 
    </div>
    )
}

export default NewPost

export async function getServerSideProps(context) {
    await connectDB();

    let flash = ""
    let flashError = ""
    
    if(context.query.flash){
      flash = context.query.flash
    }
    if(context.query.flashError){
      flashError = context.query.flashError
    }
    return{
      props:{
          flash:flash,
          flashError: flashError
      }
    }
  }