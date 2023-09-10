import useWebSocket from "react-use-websocket";
import {useState} from "react";

const socketUrl = "ws://127.0.0.1:8000/ws/test/"


const Server = () => {
    const [message, setMessage] = useState("")
    const {sendJsonMessage} = useWebSocket(socketUrl, {
        onOpen:() => {
            console.log('connected')
        },
        onClose:() => {
            console.log('closed')
        },
        onError:() => {
            console.log("Error")
        },
        onMessage:(msg) => {

            setMessage(msg.data)
        }

    })

    const sendHello = () => {
        const message = {text:"hello"}
        sendJsonMessage(message)
    }

    return (
        <div>
            <button onClick={sendHello}>Send hello</button>
            <div>Recieved data: {message}</div>
        </div>
    );
};

export default Server;