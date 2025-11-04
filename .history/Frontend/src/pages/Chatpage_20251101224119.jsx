export const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen">    
        <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">Chat Application</h1>
        </header>
        <main className="flex-grow p-4 overflow-y-auto">
            <div className="mb-4">
                <div className="bg-gray-200 p-2 rounded mb-2 w-1/2">

                    <p className="text-sm">Hello! How are you?</p>
                    <span className="text-xs text-gray-500">10:00 AM</span>
                </div>
                <div className="bg-blue-500 text-white p-2 rounded mb-2 w-1/2 ml-auto">

                    <p className="text-sm">I'm good, thanks! How about you?</p>
                    