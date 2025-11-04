import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { getMessageByUserId } from "../../../Backend/src/controllers/message.controller";

const ChatContainer=()=>{
    const {selectedUser,getmessagesByUserId,messages}=useChatStore();
    const {authUser}=useAuthStore()

    useEffect(()=>{
        getmessagesByUserId(selectedUser._id);

    },[selectedUser,getMessageByUserId])

    return (

        <div>
<
         
        </div>
    )
};

export default ChatContainer;
