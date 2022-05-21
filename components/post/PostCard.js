import Link from "next/link";
import useSWR from "swr";
import { fetcherFn } from "../../lib/hooks";
import {useState, useEffect} from 'react';

const PostCard = (props) =>{

    const [author, setAuthor] = useState("");
    const post = props.post;
    const {data} = useSWR(`/api/users/${props.post.author}`, fetcherFn);

    useEffect(()=>{
        if(data){
            setAuthor(data.user);
        }
    },[data]);

    return(
        <Link href={{pathname: `/posts/${encodeURIComponent(post._id)}`, 
                    query:{
                        postId: post._id,
                    }  
        }}>
            <div className="container p-3 shadow-lg flex flex-row w-full cursor-pointer hover:border-pafTeal hover:border-2 ">
                <h2 className="font-medium w-1/2">{post.title}</h2>
                <h4 className="w-1/2 text-right"><span className="font-light text-neutral-500">Submitted by:</span> {author.username}</h4>
            </div>
        </Link>
    )
}

export default PostCard;