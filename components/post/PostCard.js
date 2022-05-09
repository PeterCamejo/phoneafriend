import Link from "next/link";

const PostCard = (props) =>{

    const post = props.post;

    return(
        <Link href={{pathname: `/posts/${encodeURIComponent(post._id)}`, 
                    query:{
                        postId: post._id,
                    }  
        }}>
            <div className="container p-3 shadow-lg flex flex-row w-full cursor-pointer ">
                <h2 className="font-medium w-1/2">{post.title}</h2>
                <h4 className="w-1/2 text-right"><span className="font-light text-neutral-500">Submitted by:</span> {post.author}</h4>
            </div>
        </Link>
    )
}

export default PostCard;