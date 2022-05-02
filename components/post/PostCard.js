import Link from "next/link";

const PostCard = (props) =>{

    const post = props.post;

    return(
        <Link href={{pathname: `/posts/${encodeURIComponent(post._id)}`, 
                    query:{
                        title:post.title,
                        author:post.author,
                        body: post.body}
                        
                        }}>
            <div className="container flex flex-row w-full border-2 border-black border-solid">'
                <h2>{post.title}</h2>
                <h4>{post.author}</h4>
                <p>{post.body}</p>
            </div>
        </Link>
    )
}

export default PostCard;