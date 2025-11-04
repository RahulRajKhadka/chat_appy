import { useChatStore } from "../store/useChatStore";

const ChatContainer=()=>{
    const {selectedUser,getmessagesByUserId,messages}=useChatStore();
    const {authUser}=useAuth

    return (

        <div>

         
        </div>
    )
};

export default ChatContainer;
