import Link from 'next/link'

const PostBody = (props) =>{

    const post = props.post;

    return(
        <div className="container flex flex-col justify-center w-full text-center items-center">
            <div className="container flex flex-row mb-3">
                <Link href="/">
                    <button className="p-3 border-solid border-black border-2">
                        Go Back
                    </button>
                </Link> 
            </div>
            <div className='container border-solid border-black border-2'>
                <h1>{post.title}</h1>
                <h4 className='mb-3'>Submitted by: {post.author}</h4>
                <p className='p-3 border-black border-solid border-2'>{post.body}</p>
            </div>
        </div>
    )
}


export default PostBody