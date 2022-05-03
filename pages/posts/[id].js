import { useRouter } from "next/router"
import Link from 'next/link'
import {useState, useEffect} from 'react'
import Comments from "../../components/comment/Comments"
import PostBody from "../../components/post/PostBody"


function ShowPost(props) {
    
    const handleDelete = async (e) =>{
        e.preventDefault();

        // setFlashError('');
        // setFlashSuccess('');
        console.log(props.post.id);
    
        let response = await fetch('/api/posts', {
            method: 'DELETE',
            body: JSON.stringify(props.post.id)
        });
        let data = await response.json();

        return

        // if(data){
        //     setTitle('');
        //     setBody('');

        //     return setFlashSuccess(data.data);
        // }else{
        //     return setFlashError("An Error has occured");
        // }
    }

    return(
        <div className="flex flex-col justify-center border-2 border-solid border-black items-center h-screen w-screen">
            <PostBody post={props.post} />
          {/* <Comments id={id}/>  */}
        <div className="container space-x-4 mt-3">
            <button className="p-3 border-solid  border-2 border-black"onClick={handleDelete}>
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
                <button className="p-3 border-solid border-2 border-black">
                    Edit Post
                </button>
            </Link>
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



export default ShowPost