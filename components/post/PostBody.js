import Link from 'next/link'

const PostBody = (props) =>{

    const post = props.post;

    return(
        <div className="container flex flex-col justify-center w-full text-center items-center">
            <div className="container flex flex-row mb-3">
                <Link href="/">
                    <button className="p-3 border-solid rounded-md border-black border-2">
                        Go Back
                    </button>
                </Link> 
            </div>
            <div className='container border-solid rounded-md border-black border-2'>
                <div className='shadow-lg p-3'>
                    <h1 className='font-lg'>{post.title}</h1>
                    <h4 className='font-light text-neutral-500'>Submitted by: {post.author}</h4>
                </div>
                <p className='p-3'>{post.body}</p>
            </div>
        </div>
    )
}


export default PostBody