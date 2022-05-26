import { useRouter } from "next/router"
import Link from 'next/link'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import handleMiddlewareResponse from "../../lib/middlewares/handleMiddlewareResponse"
 
const AuthorButtons = (props) => {
    const router = useRouter();
    
    const handleDelete = async (e) =>{
        e.preventDefault();

        let response = await fetch('/api/posts', {
            method: 'DELETE',
            body: JSON.stringify(props.post._id)
        });
        let data = await response.json();

        if(data){
            
            handleMiddlewareResponse(router, data);

            await router.push({
                                pathname:"/",
                                query: { flash : data.data },
            });

            return router.reload();
        }

        return
    }

    return(
        <div className="container space-x-4 my-3">
            <button className="p-2 text-2xl bg-flashRed rounded-md"onClick={handleDelete}>
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
                <button className="p-2 rounded-md bg-flashGreen ">
                    <FaEdit className="text-2xl" />
                </button>
            </Link>
        </div>
    )
}

export default AuthorButtons