
const PostBody = (props) =>{

    const post = props.post;

    return(
        <div className="container flex flex-col justify-center w-full text-center items-center">
            <div className='container border-solid pb-2 rounded-md border-2'>
                <div className='shadow-lg p-5 bg-pafTeal '>
                    <h1 className='text-2xl font-medium text-left'>{post.title}</h1>
                </div>
                <div className='p-3'>
                    <p className='mb-3 text-left' >{post.body}</p>
                    <h4 className='float-right'><span className="font-light text-neutral-500 ">Submitted by:</span> {props.author.username}</h4>
                </div>
            </div>
        </div>
    )
}


export default PostBody