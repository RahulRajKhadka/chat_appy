import { useChatStore } from "../store/useChatStore";

const ChatContainer=()=>{
    const {selectedUser,getmessagesByUserId,messages}=useChatStore();
    const {authUser}=useAuthStore

    return (

        <div>

         
        </div>
    )
};

export default ChatContainer;
