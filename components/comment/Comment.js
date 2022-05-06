

const Comment = (props) =>{



    return(
        <div className="container border-black border-2 border-solid inline p-2">
            <h4>{props.comment.author ? props.author : "Me"}</h4>
            <p>{props.comment.body ? props.body : "NoBody"}</p>
        </div>
    )
}

export default Comment