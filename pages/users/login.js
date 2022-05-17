import {useState} from 'react';
import {useRouter} from 'next/router'
import Flash from '../../components/flash/Flash';
import FlashError from '../../components/flash/FlashError';
import { useEffect } from 'react'

const Login = (props) =>{

    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [flashSuccess, setFlashSuccess] = useState(props.flash);
    const [flashError,  setFlashError] = useState(props.flashError);

    const router = useRouter();

    const onSubmit = async (e) =>{
        e.preventDefault();

        if(!username || !password ){
            setFlashError("All fields required");
        }

        let user = {
            username,
            password
        }

        let response = await fetch('/api/users/login',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        })
        
        let data = await response.json();

        if(data){
           router.push({
                pathname: '/',
                query: {
                    flash:data.data
                }
            });
            router.reload();
        }else{
            return setFlashError("Failed to login!");
        }
    }

    useEffect(()=>{
        router.prefetch('/');
    }, []);


    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <h1 className='mb-3 text-3xl underline'>Login</h1>
            <div className='container w-3/4'>
                {/*Flash Stuff */}
                {flashSuccess && <Flash body={flashSuccess} />}
                {flashError && <FlashError body={flashError} />}
                <div className='container p-3 flex rounded-md border-solid border-2'>
                    <form onSubmit={onSubmit} className='w-full'>
                        <div className='mb-3'>
                            <label>Username: </label>
                            <input className='container p-3 flex rounded-md border-solid border-2' 
                                   name='username'
                                   type='text'
                                   onChange={(e)=>{setUsername(e.target.value)}}
                                   value={username}
                                   required
                            />
                        </div>
                        <div className='mb-3'>
                            <label>Password: </label>
                            <input className='container p-3 flex rounded-md border-solid border-2 '
                                   name="password"
                                   type='password'
                                   onChange={(e)=>{setPassword(e.target.value)}}
                                   value={password}
                                   required 
                            />
                        </div>
                        <button className='p-3 bg-pafGreen rounded-md' type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

export async function getServerSideProps(context) {
    let flash = ""
    let flashError = ""
  
    if(context.query.flash){
      flash = context.query.flash
    }
    if(context.query.flashError){
        flashError = context.query.flashError
    }
    return{
      props:{
          flash:flash,
          flashError: flashError
      }
    }
  }