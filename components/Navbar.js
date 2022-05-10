
const Navbar = () => { 

    return (
        <div className="fixed top-0 w-screen p-3 flex flex-row justify-between shadow-md bg-pafTeal">
            <div className="flex flex-row space-x-4 w-1/2">
                <h1>P-A-F</h1>
                <h4>Posts</h4>
                <h4>New Post</h4>
            </div>    
            <div className="flex flex-row justify-end space-x-4 w-1/2">
                <h4>Login</h4>
                <h4>Register</h4>
                {/* Or <h4>Logout</h4> if logged in */}
            </div>
        </div>
    )
}


export default Navbar