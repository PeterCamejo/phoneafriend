import {useState} from 'react'
import {FaArrowAltCircleUp, FaArrowAltCircleDown} from 'react-icons/fa';

const Rating = (props) =>{

    const [rating, setRating] = useState(props.rating);
    const [upvoted , setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const incrementRating = props.incrementRating;
    const decrementRating = props.decrementRating;

    const increment = ()=>{
        let newRating = rating;
        if(!upvoted){
            if(downvoted){
                setDownvoted(false);
                ++newRating;
                incrementRating();
            }
            setUpvoted(true);
            setRating(++newRating);
            incrementRating();
        }else{
            setUpvoted(false);
            setRating(rating-1);
            decrementRating();
        }
    }

    const decrement = ()=>{
        let newRating = rating;
        if(!downvoted){
            if(upvoted){
                setUpvoted(false);
                --newRating;
                decrementRating();
            }
            setDownvoted(true);
            setRating(--newRating);
            decrementRating();
        }else{
            setDownvoted(false);
            setRating(rating+1);
            incrementRating();
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