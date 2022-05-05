
import {useState} from 'react'


const Flash = (props) =>{ 

    const [body , setBody] = useState(props.body);

    const handleClick = () =>{
        setBody("")
    }

    if(body){
        if(props.error){
        
            <div className="mb-3 p-3 w-full flex justify-between items-center bg-flashRed">
                <p>Error: {props.body}</p>
                <button className= "h-5 w-5 text-center flex justify-center items-center border-slate-500 border-solid  border-2" onClick={handleClick}>
                    x
                </button>
            </div> 
        }
        return(
            <div className="mb-3 p-3 w-full flex justify-between items-center bg-flashGreen">
                <p>{props.body}</p>
                <button className= "h-5 w-5 text-center flex justify-center items-center border-slate-500 border-solid  border-2" onClick={handleClick}>
                    x
                </button>
            </div>
        )
    }

    return
    
}

export default Flash