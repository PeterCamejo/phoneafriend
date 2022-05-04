import { useRouter } from "next/router"
import Link from 'next/link'
import {useState, useEffect} from 'react'
import Comments from "../../components/comment/Comments"
import PostBody from "../../components/post/PostBody"


function ShowPost(props) {
    const router = useRouter();
    const [flashError , setFlashError] = useState('');
    const [flashSuccess, setFlashSuccess] = useState(props.flash);
    
    const handleDelete = async (e) =>{
        e.preventDefault();

        setFlashError('');
        setFlashSuccess('');
  
    
        let response = await fetch('/api/posts', {
            method: 'DELETE',
            body: JSON.stringify(props.post.id)
        });
        let data = await response.json();

        if(data){
            return router.push({
                                pathname:"/",
                                query: { flash : data.data },
            });

        }else{
            return setFlashError("An Error has occured");
        }
    }

    return(
        <div className="flex flex-col justify-center border-2 border-solid border-black items-center h-screen w-screen">
            {flashSuccess ? 
                <div>{flashSuccess}</div> : null}
            {flashError ?
                <div>{flashError}</div> : null}
            <PostBody post={props.post} />
          {/* <Comments id={id}/>  */}

          {/* //TODO: Make Delete and Edit buttons a OwnerButtons components */}
        <div className="container space-x-4 mt-3">
            <button className="p-3 border-solid rounded-md border-2 border-black"onClick={handleDelete}>
                Delete Post
            </button>
            <Link href={{pathname: `/posts/${props.post.id}/edit`,
                  query:{
                    title: props.post.title,
                    author:props.post.author,
                    body: props.post.body,
                    id: props.post._id
                  }
            }}>
                <button className="p-3 rounded-md border-solid border-2 border-black">
                    Edit Post
                </button>
            </Link>
        </div>

        </div>
    )
}

export async function getServerSideProps(context) {
    let flash = context.query.flash ? context.query.flash : "";
    let post = {
        title: context.query.title,
        author: context.query.author,
        body: context.query.body,
        id: context.query.id
    }
    return{
        props:{
            post:post,
            flash:flash
        }
    }
}



export default ShowPost