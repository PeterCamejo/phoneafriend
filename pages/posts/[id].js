import { useRouter } from "next/router"
import Link from 'next/link'
import Flash from '../../components/Flash'
import {useState, useEffect} from 'react'
import Comments from "../../components/comment/Comments"
import PostBody from "../../components/post/PostBody"
import AuthorButtons from "../../components/AuthorButtons"


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
                <Flash error={false} body={flashSuccess} /> : null}
            {flashError ?
                <Flash error={true} body={flashError} /> : null}
            
            <PostBody post={props.post} />
            <AuthorButtons post={props.post} />
            <Comments postId={props.post.id}/>

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