import Link from "next/link";

const PostCard = (props) =>{

    const post = props.post;

    return(
        <Link href={{pathname: `/posts/${encodeURIComponent(post._id)}`, 
                    query:{
                        title:post.title,
                        author:post.author,
                        body: post.body,
                        id: post._id
                    }
                        
                        }}>
            <div className="container flex flex-row w-full border-2 border-black border-solid">'
                <h2>{post.title}</h2>
                <h4 className="mx-3">{post.author}</h4>
            </div>
        </Link>
    )
}

export default PostCard;