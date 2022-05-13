import {useState} from 'react'
import {useRouter} from 'next/router'

const Register = () => {

    const [email ,  setEmail] = useState("");
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const onSubmit = async (e) =>{
        e.preventDefault();

        if(!email || !username || !password){
            //setFlashError("All fields required");
        }

        const newUser = {
            email,
            username,
            password
        }

        let response = await fetch('/api/users/register',{
            method:'POST',
            body:JSON.stringify(newUser)
        });

        let data = await response.json();

        if(data){
            return router.replace({
                                pathname: '/users/login',
                                query:{
                                    flash: data.data
                                }
            });
        }else{
            return
            // return setFlashError("An Error has occured");
        }

    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <h1 className='mb-3 text-3xl underline'> Register</h1>
            <div className='container w-3/4'>
                {/*Flash Stuff */}
                <div className='container p-3 flex rounded-md border-solid border-2'>
                    <form onSubmit={onSubmit} className='w-full'>
                        <div className='mb-3'>
                            <label>Username</label>
                            <input className='border-grey border-solid border-2 w-full p-2'
                                type='text' 
                                name='username'
                                onChange={(e)=>{setUsername(e.target.value)}}
                                value={username}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label>Email: </label>
                            <input className='border-grey border-solid border-2 w-full p-2'
                                type='email' 
                                name='email'
                                onChange={(e)=>{setEmail(e.target.value)}}
                                value={email}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label>Password: </label>
                            <input className='border-grey border-solid border-2 w-full p-2'
                                type='password' 
                                name='password'
                                onChange={(e)=>{setPassword(e.target.value)}}
                                value={password}
                                required        
                            />
                        </div>
                        <button className='bg-pafGreen rounded-md p-3' type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register