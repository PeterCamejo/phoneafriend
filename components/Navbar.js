import Link from 'next/link'
import {useRouter} from 'next/router'
const Navbar = () => { 

    const router = useRouter();

    const handleLogout = async (e) =>{
        e.preventDefault();

        let response = await fetch('/api/users/logout', {
            method: 'POST'
        })

        let data = await response.json();

        if(data){
            return router.push({
                pathname: '/',
                query:{
                    flash: data.data
                }
            })
        }

        return;
    }

    return (
        <div className="fixed top-0 w-screen p-3 flex flex-row justify-between shadow-md bg-pafTeal">
            <div className="flex flex-row space-x-4 w-1/2">
                <Link href="/">Logo</Link>
                <Link href="/">Posts</Link>
                <Link href="/posts/new">New Post</Link>
            </div>    
            <div className="flex flex-row justify-end space-x-4 w-1/2">
                <Link href="/users/login">Login</Link>
                <Link href="/users/register">Register</Link>
                {/* Or <h4>Logout</h4> if logged in */}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}


export default Navbar