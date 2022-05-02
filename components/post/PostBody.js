import Link from 'next/link'

const PostBody = (props) =>{

    const post = props.post;

    return(
        <div className="container flex flex-col justify-center w-full text-center items-center">
            <Link href="/">
                go back
            </Link>
            <h1>{post.title}</h1>
            <h4>Submitted by: {post.author}</h4>
            <p>{post.body}</p>
        </div>
    )
}


export default PostBody