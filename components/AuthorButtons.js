import { useState } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
 
const AuthorButtons = (props) => {
    const router = useRouter();
    const [flashError , setFlashError] = useState('');
    const [flashSuccess, setFlashSuccess] = useState(props.flash);
    
    const handleDelete = async (e) =>{
        e.preventDefault();

        setFlashError('');
        setFlashSuccess('');
  
    
        let response = await fetch('/api/posts', {
            method: 'DELETE',
            body: JSON.stringify(props.post._id)
        });
        let data = await response.json();

        if(data){
            return router.push({
                                pathname:"/",
                                query: { flash : data.data },
            });

        }else{
            return setFlashError("An Error has occured");
        }
    }

    return(
        <div className="container space-x-4 my-3">
            <button className="p-2 text-2xl bg-flashRed border-solid rounded-md border-2 border-black"onClick={handleDelete}>
                <FaTrashAlt />
            </button>
            <Link href={{pathname: `/posts/${props.post._id}/edit`,
                query:{
                    title: props.post.title,
                    author:props.post.author,
                    body: props.post.body,
                    _id: props.post._id
                }
            }}>
                <button className="p-2 rounded-md border-solid border-2 bg-flashGreen border-black">
                    <FaEdit className="text-2xl" />
                </button>
            </Link>
        </div>
    )
}

export default AuthorButtons