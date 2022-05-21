import {useRouter} from 'next/router'
import useSWR from "swr";
import { fetcherFn } from "../../lib/hooks";
import {useState, useEffect} from 'react';

const Comment = (props) =>{

    const deleteComment = props.deleteComment;
    const router = useRouter();
    const {data} = useSWR(`/api/users/${props.comment.author}`, fetcherFn);
    const [author, setAuthor] = useState('');

    useEffect(()=>{
        if(data){
            setAuthor(data.user);
        }
    },[data])

    const handleDelete = async () =>{
        const reqBody = {
            postId: props.postId,
            commentId:props.comment._id
        }

        let response = await fetch(`/api/posts/${props.postId}/comments`, {
            method: 'DELETE',
            body: JSON.stringify(reqBody)
        });
        let data = await response.json();

        if(data){
            //failed isLoggedIn middleware
            if(data.notLoggedIn){
                return router.push({    
                    pathname: `/users/login`,
                    query: {
                        flashError : 'Need to be logged in for that'
                    }
                })
            }
            // //failed isPostAuthor middleware
            // if(data.notAuthor){
            //     return router.push({    
            //         pathname: '/',
            //         query: {
            //             flashError : 'You are not the author.'
            //         }
            //     })
            // }
            deleteComment(props.comment);
        }
        
        return
    }

    return(
        <div className="container shadow-md  inline p-2">
            <button onClick={handleDelete} className="float-right">
                X
            </button>
            <p>{props.comment.body}</p>
            <h4 className="font-medium float-right text-slate-500">{author.username}</h4>
        
        </div>
    )
}

export default Comment