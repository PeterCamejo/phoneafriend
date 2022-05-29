import { useUser } from "../../lib/hooks"
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'


const EditUser = (props) =>{

    const router = useRouter();
    const [user, {loading}] = useUser();
    const [currentUser , setCurrentUser] = useState("");

    useEffect(()=>{
        if(!loading && !user){
            router.replace({
                pathname:'/users/login',
                query:{
                    flashError:'Need to login for that!'
                }
        });
        }else{
            setCurrentUser(user);
        }
    }, [user, loading]);
    
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="container flex flex-col items-center border-2 p-3 md:w-1/3 md:h-1/3">
                <form className="flex flex-row">
                    <div className="m-3">
                        <label>Username: </label>
                        <input type='text' className="border-2 p-2" value={currentUser.username}></input>
                    </div>
                    <button type='submit' className="p-2 rounded-sm border-2">
                        Update Username
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditUser

