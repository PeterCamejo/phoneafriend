import {useState} from 'react';
import Flash from '../../components/flash/Flash';

const Login = (props) =>{

    const [email ,  setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [flashSuccess, setFlashSuccess] = useState(props.flash);

    const onSubmit = () =>{

    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <h1 className='mb-3 text-3xl underline'>Login</h1>
            <div className='container w-3/4'>
                {/*Flash Stuff */}
                {flashSuccess && <Flash body={flashSuccess} />}
                <div className='container p-3 flex rounded-md border-solid border-2'>
                    <form onSubmit={onSubmit} className='w-full'>
                        <div className='mb-3'>
                            <label>Email: </label>
                            <input className='container p-3 flex rounded-md border-solid border-2' 
                                   type='email' />
                        </div>
                        <div className='mb-3'>
                            <label>Password: </label>
                            <input className='container p-3 flex rounded-md border-solid border-2 '
                                   type='password' />
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
  
    if(context.query.flash){
      flash = context.query.flash
    }
    return{
      props:{
          flash:flash
      }
    }
  }