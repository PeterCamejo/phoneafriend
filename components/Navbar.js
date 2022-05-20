import Link from 'next/link'
import {useRouter} from 'next/router'
import {useUser} from '../lib/hooks'
import LogOutBtn from './user/LogOutBtn'
 
const Navbar = () => { 

    const router = useRouter();
    const [user, {loading}] = useUser();

    const handleLogout = async (e) =>{
        e.preventDefault();

        let response = await fetch('/api/users/logout', {
            method: 'POST'
        })

        let data = await response.json();

        if(data){
            router.push({
                pathname: '/',
                query:{
                    flash: data.data
                }
            })
            return router.reload();
        }

        return;
    }

    return (
        <div className="fixed top-0 w-screen p-3 flex flex-row justify-between shadow-md bg-pafTeal">
            <div className="flex flex-row space-x-4 w-1/2">
                <Link href="/">Logo</Link>
                <Link href="/">Posts</Link>
                {(user || loading) && <Link href="/posts/new">New Post</Link>}
            </div>    
            <div className="flex flex-row justify-end space-x-4 w-1/2">
                {(!user && !loading) && <Link href="/users/login">Login</Link> }
                {(!user && !loading) && <Link href="/users/register">Register</Link>}
                 {(user || loading) && <LogOutBtn handleLogout={handleLogout} />}
            </div>
        </div>
    )
}


export default Navbar
