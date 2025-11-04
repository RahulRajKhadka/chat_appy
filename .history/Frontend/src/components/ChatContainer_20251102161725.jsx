import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const ChatContainer=()=>{
    const {selectedUser,getmessagesByUserId,messages}=useChatStore();
    const {authUser}=useAuthStore()

    useEffect(()=>{
        getmessagesByUserId(selectedUser.)
    })

    return (

        <div>

         
        </div>
    )
};

export default ChatContainer;
