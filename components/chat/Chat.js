import {useState , useEffect} from 'react'
import io from 'socket.io-client';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';


const Chat = (props) =>{

    const [socket, setSocket] = useState(null);

    useEffect(()=>{
        const newSocket = io(`https://${window.location.hostname}:3000`);
        setSocket(newSocket);
        return ()=> newSocket.close();
    }, [setSocket]);

    return(
        <div className='container w-full'>
            {socket ? (
                <div>
                    <ChatMessages socket={socket} />
                    <ChatInput socket={socket} />
                </div>
            ) : (
                <div>
                    Not Connect Yet!
                </div>
            )}
        </div>
    )

}


export default Chat