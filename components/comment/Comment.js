import {useRouter} from 'next/router'
import useSWR from "swr";
import { fetcherFn } from "../../lib/hooks";
import {useState, useEffect} from 'react';
import { useUser } from '../../lib/hooks';
import Rating from '../Rating';
import handleMiddlewareResponse from '../../lib/middlewares/handleMiddlewareResponse';

const Comment = (props) =>{

    const deleteComment = props.deleteComment;
    const router = useRouter();
    const {data} = useSWR(`/api/users/${props.comment.author}`, fetcherFn);
    const [author, setAuthor] = useState('');
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [voted, setVoted] = useState(false);
    const [user , {loading}] = useUser();

    useEffect(()=>{
        if(data){
            setAuthor(data.user);
        }

        if(user){
            const match = user.votedComments.some( votedComment => votedComment['comment'] === props.comment._id);
            if(match){
                console.log('match');
                setVoted(true);
                setUpvoted(match.vote > 0);
                setDownvoted(match.vote < 0);
            }else{
                setVoted(false);
            }
        }


    },[data, user])

    const isAuthor = ()=> {
        if(user ){
                    if(props.comment.author === user._id){
                        return true;
                    }
            }

        return false;
    }

    const hasVoted = () => {
        if(user){
            const match = user.votedComments.some( votedComment => votedComment['comment'] === props.comment._id);
            if(match){
                setUpvoted(match.co)
            }
            return match;
        }

        return false;
    }

    const handleDelete = async () =>{
        const reqBody = {
            postId: props.postId,
            commentId:props.comment._id
        }

        let response = await fetch(`/api/posts/${props.postId}/comments`, {
            method: 'DELETE',
            body: JSON.stringify(reqBody)
        });
        let resdata = await response.json();

        if(resdata){
            handleMiddlewareResponse(router, resdata);
            deleteComment(props.comment);
        }
        
        return
    }

    const saveDownvote = async()=>{
        //Save vote for this comment in current user model
        const body = {
            commentId: props.comment._id,
            vote: -1
        }

        const response = await fetch(`/api/users/${user._id}/votedComments`,{
            method: 'PUT',
            body:JSON.stringify(body)
        })

        const resdata = await response.json();
        if(resdata){
            handleMiddlewareResponse(router, resdata);
        }
    }

    const saveUpvote = async()=>{
        //Save vote for this comment in current user model
        const body = {
            commentId: props.comment._id,
            vote: 1
        }

        const response = await fetch(`/api/users/${user._id}/votedComments`,{
            method: 'PUT',
            body:JSON.stringify(body)
        })

        const resdata = await response.json();
        if(resdata){
            handleMiddlewareResponse(router, resdata);
        }
    }

    const removeVote = async() =>{
        //Remove vote for this comment from the current user model

        const body = {
            commentId: props.comment._id
        }

        let response = await fetch(`/api/users/${user._id}/votedComments`,{
            method: 'DELETE',
            body: JSON.stringify(body)
        })

        let resdata = await response.json();
        if(resdata){
            handleMiddlewareResponse(router, resdata);
        }
    }

    const incrementRating = async() =>{

        //Increment rating in the comment model
        const body = {
            commentId: props.comment._id
        }

        let response = await fetch('/api/comments/votes', {
            method: 'POST',
            body: JSON.stringify(body)
        });

        let resdata = await response.json();
        if(resdata){
            handleMiddlewareResponse(router, resdata);
        }

        saveUpvote();

        return;
    }

    const decrementRating = async() =>{

        //Decrement rating in the comment model
        const body = {
            commentId: props.comment._id
        }

        let response = await fetch('/api/comments/votes',{
            method: 'DELETE',
            body: JSON.stringify(body)
        })

        let resdata = await response.json();
        if(resdata){
            handleMiddlewareResponse(router, resdata);
        }

        saveDownvote();

        return;

    }

    const upvoteMethod = async () =>{
        if(upvoted){
            setUpvoted(false);
            await removeVote();
            await decrementRating();
            return;
        }
        if(downvoted){
            setDownvoted(false);
        }

        setUpvoted(true);
        await incrementRating();
        await saveUpvote();
        return;
    }

    const  downvoteMethod = async () =>{
        if(downvoted){
            setDownvoted(false);
            await removeVote();
            await incrementRating();
            return;
        }
        if(upvoted){
            setUpvoted(false);
        }

        setDownvoted(true);
        await decrementRating();
        await saveDownvote();
        return;
    }

    return(
        <div className="container p-3 shadow-lg flex flex-row justify-between w-full cursor-pointer">
            <div className='h-100 flex flex-row space-x-5'>
                <div className='flex flex-col h-full justify-center align-center'>
                    {voted ?                     
                        <Rating rating={props.comment.rating}
                            upvoteMethod = {upvoteMethod}
                            downvoteMethod = {downvoteMethod}
                            upvoted={upvoted}
                            downvoted={downvoted}  
                        /> :
                        <Rating rating={props.comment.rating}
                        upvoteMethod = {upvoteMethod}
                        downvoteMethod = {downvoteMethod}
                        upvoted={upvoted}
                        downvoted={downvoted}  
                        />
                    }
                </div>
                <p>{props.comment.body}</p>
            </div>
            <div className='flex flex-col'>
                {isAuthor() &&
                    <button onClick={handleDelete} className="float-right">
                        X
                    </button>
                }
                <h4 className="font-medium float-right text-slate-500">{author.username}</h4>
            </div>        
        </div>
    )
}

export default Comment