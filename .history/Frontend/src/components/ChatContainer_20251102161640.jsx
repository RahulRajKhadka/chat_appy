import { useChatStore } from "../store/useChatStore";
import {}

const ChatContainer=()=>{
    const {selectedUser,getmessagesByUserId,messages}=useChatStore();
    const {authUser}=useAuthStore()

    return (

        <div>

         
        </div>
    )
};

export default ChatContainer;
