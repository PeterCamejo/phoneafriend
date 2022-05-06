

const Comment = (props) =>{



    return(
        <div className="container border-black border-2 border-solid inline p-2">
            <h4>{props.author ? props.author : "Me"}</h4>
            <p>{props.body ? props.body : "NoBody"}</p>
        </div>
    )
}

export default Comment