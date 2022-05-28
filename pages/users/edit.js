import { useUser } from "../../lib/hooks"
import {useEffect} from 'react'
import {useRouter} from 'next/router'


const EditUser = (props) =>{

    const router = useRouter();
    const [user, {loading}] = useUser();

    useEffect(()=>{
        if(!loading && !user){
            router.replace({
                pathname:'/users/login',
                query:{
                    flashError:'Need to login for that!'
                }
        });
        }
    }, [user, loading]);
    
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label>Username</label>
                        <input type='text' className="border-2"></input>
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

