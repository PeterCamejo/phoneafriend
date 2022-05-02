import {useState} from 'react'
import Link from 'next/link'

const EditPost = (props) => { 
    const [title, setTitle] = useState("");
    const [body,  setBody] = useState("");

    const handleUpdate = async (e) =>{
        e.preventDefault();

        // setFlashError('');
        // setFlashSuccess('');

        if(!title || !content){
            // setFlashError('All fields are required');
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
        }
        return
        //     return setFlashSuccess(data.data);
        // }else{
        //     return setFlashError("An Error has occured");
        // }

    }
     
    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <Link href={{pathname: `/posts/${props.post.id}`,
                  query:{
                    title: props.post.title,
                    author:props.post.author,
                    body: props.post.body,
                    id: props.post._id
                  }
            }}>
                <button className="p-3 border-solid border-black border-2">
                    Go Back
                </button>
            </Link>
           <div className="container flex justify-center">
               <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label>Title</label>
                        <input className='border-solid border-black border-2'
                               name="title" 
                               type='text'
                               onChange={(e)=>{setTitle(e.target.value)}}
                               value={title}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label>Body</label>
                        <textarea className='border-solid border-black border-2'
                                  name="body"
                                  onChange={(e)=>{setBody(e.target.value)}}
                                  value={body}
                        ></textarea>
                    </div>
                    <button  className='p-3 border-solid border-black border-2'>
                        Update
                    </button>
               </form>
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