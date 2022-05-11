import {useState} from 'react'

const Register = () => {

    const [email ,  setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () =>{

    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <div className='container flex flex-col justify-center items-center border-2 '>
                <h1> Register </h1>
                <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                        <label>Email: </label>
                        <input className='border-2' type='email' />
                    </div>
                    <div className='mb-3'>
                        <label>Password: </label>
                        <input className='border-2' type='password' />
                    </div>
                    <div className='mb-3'>
                        <label></label>
                        <input />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register