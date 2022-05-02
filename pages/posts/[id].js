import { useRouter } from "next/router"
import {useState, useEffect} from 'react'
import Comments from "../../components/comment/Comments"
import PostBody from "../../components/post/PostBody"


function ShowPost(props) {
    
    // const [data , setData] = useState("");

    // /*
    // * SOURCE: https://stackoverflow.com/questions/42862253/how-to-parse-query-string-in-react-router-v4/51359101#51359101

    // * Used to get query values as parameters.
    // */
    // const getQueryStringParams = query => {
    //     return query
    //         ? (/^[?#]/.test(query) ? query.slice(1) : query)
    //             .split('&')
    //             .reduce((params, param) => {
    //                     let [key, value] = param.split('=');
    //                     params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
    //                     return params;
    //                 }, {}
    //             )
    //         : {}
    // };
    
    // useEffect(()=>{
    //   const {id} = getQueryStringParams(window.location.search);
    //   id = id.replace(/"/g,''); //remove quotations from id.
    //   const apiURL = '/api/posts/'+id;
    //   console.log(apiURL);
    //   fetch(apiURL.toString()).then((response) => response.json())
    //                 .then((data)=> setData(data))
    // }, [])

    
    return(
        <div className="flex flex-col justify-center border-2 border-solid border-black items-center h-screen w-screen">
            {/* {props.post ? <div>{props.post.title}</div> : <h1>nah</h1>} */}
            <PostBody post={props.post} />
          {/* <Comments id={id}/>  */}
        </div>
    )
}

export async function getServerSideProps(context) {
    let post = {
        title: context.query.title,
        author: context.query.author,
        body: context.query.body
    }
    return{
        props:{
            post:post
        }
    }
}



export default ShowPost