import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'


const EditPost = (props) => { 
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [body,  setBody] = useState("");
    const [flashError , setFlashError] = useState("");

    const handleUpdate = async (e) =>{
        e.preventDefault();

        setFlashError('');
        // setFlashSuccess('');

        if(!title || !content){
            setFlashError('All fields are required');
            return;
        }
        
        let newPost = {
            id: props.post.id,
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
                                pathname: `/posts/${props.post.id}`,
                                query: {
                                    id: props.post.id,
                                    author: props.post.author,
                                    body: body,
                                    title: title,
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
                <div className='container'>
                    <Link href={{pathname: `/posts/${props.post.id}`,
                        query:{
                            title: props.post.title,
                            author:props.post.author,
                            body: props.post.body,
                            id: props.post._id
                        }
                    }}>
                        <button className="p-3 mb-3 rounded-md border-solid border-black border-2">
                            Go Back
                        </button>
                    </Link>
                </div>
                <div className="container p-3 rounded-md flex border-black border-2 border-solid ">
                    <form className="w-full" onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label>Title</label>
                                <input className='border-solid border-gray border-2 w-full'
                                    name="title" 
                                    type='text'
                                    onChange={(e)=>{setTitle(e.target.value)}}
                                    value={title}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label>Body</label>
                                <textarea className='border-solid border-gray border-2 w-full'
                                        name="body"
                                        onChange={(e)=>{setBody(e.target.value)}}
                                        value={body}
                                ></textarea>
                            </div>
                            <button  className='p-3 w-1/3 rounded-md border-solid border-black border-2'>
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
        id: context.query.id
    }
    return{
        props:{
            post:post
        }
    }
}


export default EditPost