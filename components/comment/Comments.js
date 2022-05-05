import NewCommentForm from "./NewCommentForm"


const Comments = (props) =>{
    

    return(
        <div className="w-full flex flex-col justify-center items-center">
            <NewCommentForm />
            {/* {props.comments.map((comment, index) => {
                return(
                    <Comment comment={comment} key={index} />
                )
            })} */}
        </div>
    )
}

export default Comments