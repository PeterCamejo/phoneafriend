import {useState} from 'react'
import {FaArrowAltCircleUp, FaArrowAltCircleDown} from 'react-icons/fa';

const Rating = (props) =>{

    const [rating, setRating] = useState(props.rating);
    const [upvoted , setUpvoted] = useState(props.upvoted);
    const [downvoted, setDownvoted] = useState(props.downvoted);
    const upvoteMethod = props.upvoteMethod;
    const downvoteMethod = props.downvoteMethod;

    const increment = ()=>{
        upvoteMethod();
        let newRating = rating;
        if(!upvoted){
            if(downvoted){
                setDownvoted(false);
                ++newRating;
            }
            setUpvoted(true);
            setRating(++newRating);
        }else{
            setUpvoted(false);
            setRating(rating-1);
        }
    }

    const decrement = ()=>{
        downvoteMethod();
        let newRating = rating;
        if(!downvoted){
            if(upvoted){
                setUpvoted(false);
                --newRating;
            }
            setDownvoted(true);
            setRating(--newRating);
        }else{
            setDownvoted(false);
            setRating(rating+1);
        }

    }

    return(
        <div className='flex flex-row space-x-2'>
            {upvoted ?
            <FaArrowAltCircleUp className='text-pafGreen text-3xl' onClick={increment} /> :
            <FaArrowAltCircleUp className='text-slate-300 text-3xl' onClick={increment} />
            }   
            <div className='text-xl'>
                {rating}
            </div>
            {downvoted ? 
            <FaArrowAltCircleDown className='text-pafGreen text-3xl' onClick={decrement} /> :
            <FaArrowAltCircleDown className='text-slate-300 text-3xl' onClick={decrement} />
            }
        </div>
    )
}

export default Rating