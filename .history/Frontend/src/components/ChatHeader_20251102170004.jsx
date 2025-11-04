
import { useChatStore } from "../store/useChatStore";


function ChatHeader(){

    const {selectedUser, selectedUser}=useChatStore();
    return(

        <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700 max-h-[84px] px-6 flex-1">
            <div className="flex items-center space-x-3">
                <div className="avatar online">
                    <div>
                        <img src={selectedUser.profilePic || "/avatar.webp"} alt={selectedUser.fullName} />
                    </div>
                </div>

                <div>
                    h3
                </div>
            </div>
        </div>
    )
}````