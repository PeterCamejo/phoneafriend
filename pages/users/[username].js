import { useUser } from "../../lib/hooks"


const ViewProfile = (props) =>{

    const [user, {loading}] = useUser();

    return(
        <div className="h-screen w-screen flex justify-center items-center">
            {(user && <h4>Username: {user.username}</h4>)}
        </div>
    )
}

export default ViewProfile