import Link from 'next/link'

const Navbar = () => { 

    return (
        <div className="fixed top-0 w-screen p-3 flex flex-row justify-between shadow-md bg-pafTeal">
            <div className="flex flex-row space-x-4 w-1/2">
                <Link href="/">Logo</Link>
                <Link href="/">Posts</Link>
                <Link href="/posts/new">New Post</Link>
            </div>    
            <div className="flex flex-row justify-end space-x-4 w-1/2">
                <Link href="/user/login">Login</Link>
                <Link href="/user/register">Register</Link>
                {/* Or <h4>Logout</h4> if logged in */}
            </div>
        </div>
    )
}


export default Navbar