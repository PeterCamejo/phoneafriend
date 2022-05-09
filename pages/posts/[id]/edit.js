import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Flash from '../../../components/flash/Flash';
import FlashError from '../../../components/flash/FlashError';
import {FiArrowLeft} from 'react-icons/fi'



const EditPost = (props) => { 
    const router = useRouter();
    const [title, setTitle] = useState(props.post.title);
    const [body,  setBody] = useState(props.post.body);
    const [flashError , setFlashError] = useState("");
    const [flashSuccess, setFlashSuccess] = useState("");

    const handleUpdate = async (e) =>{
        e.preventDefault();

        setFlashError('');
        setFlashSuccess('');

        if(!title || !content){
            setFlashError('All fields are required');
            return;
        }
        
        let newPost = {
            _id: props.post._id,
            author: props.post.author,
            body,
            title
        }
        let response = await fetch('/api/posts/', {
            method: 'PUT',
            body: JSON.stringify(newPost)
        });
        let data = await response.json();

        if(data){
            setTitle('');
            setBody('');

            return router.push({
                                pathname: `/posts/${props.post._id}`,
                                query: {
                                    postId: props.post._id,
                                    flash : data.data
                                }
            })
        }else{
            return setFlashError("An Error has occured");
        }

    }

     
    return(
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <h1 className='underline mb-3 text-lg'>Edit Post</h1>
            <div className='container w-1/2'>
                <Flash body={flashSuccess} />
                {flashError && <FlashError body={flashError} />}
                <div className='container'>
                    <Link href={{pathname: `/posts/${props.post._id}`,
                        query:{
                            postId: props.post._id
                        }
                    }}>
                    <button className="p-2 mb-3 text-2xl border-solid bg-pafGreen rounded-md border-black border-2">
                        <FiArrowLeft />
                    </button>
                    </Link>
                </div>
                <div className="container p-3 rounded-md flex border-black border-2 border-solid ">
                    <form className="w-full" onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label>Title</label>
                                <input className='border-solid border-gray border-2 p-2 w-full'
                                    value={title}
                                    name="title" 
                                    type='text'
                                    onChange={(e)=>{setTitle(e.target.value), setFlashError("")}}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label>Body</label>
                                <textarea className='border-solid border-gray border-2 w-full p-2'
                                        name="body"
                                        onChange={(e)=>{setBody(e.target.value), setFlashError("")}}
                                        value={body}
                                >
                                </textarea>
                            </div>
                            <button  className='p-3 cursor-pointer rounded-md border-solid border-black border-2'>
                                Update
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
    let post = {
        title: context.query.title,
        author: context.query.author,
        body: context.query.body,
        _id: context.query._id
    }
    return{
        props:{
            post:post
        }
    }
}


export default EditPost