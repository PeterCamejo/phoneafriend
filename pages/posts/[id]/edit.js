import {useState} from 'react'
import {useRouter} from 'next/router'
import Flash from '../../../components/flash/Flash';
import FlashError from '../../../components/flash/FlashError';
import connectDB from '../../../lib/mongodb';
import handleMiddlewareResponse from '../../../lib/middlewares/handleMiddlewareResponse';

const EditPost = (props) => { 
    const router = useRouter();
    const [title, setTitle] = useState(props.post.title);
    const [body,  setBody] = useState(props.post.body);
    const [flashError , setFlashError] = useState("");
    const [flashSuccess, setFlashSuccess] = useState("");

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

        const response = await fetch('/api/posts/', {
            method: 'PUT',
            body: JSON.stringify(newPost)
        });

        const data = await response.json();

        if(data){
            
            await handleMiddlewareResponse(router, data);

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
            <h1 className='underline mb-3 text-3xl'>Edit Post</h1>
            <div className='container w-3/4'>
                <Flash body={flashSuccess} />
                {flashError && <FlashError body={flashError} />}
                <div className="container p-3 rounded-md flex border-2 border-solid ">
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
                            <button  className='p-3 cursor-pointer bg-pafGreen rounded-md'>
                                Update
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
    await connectDB();

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